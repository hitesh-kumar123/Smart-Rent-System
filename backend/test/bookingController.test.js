const assert = require('node:assert/strict');
const test = require('node:test');
const Module = require('node:module');

const bookingModelPath = require.resolve('../models/booking');
const propertyModelPath = require.resolve('../models/property');
const userModelPath = require.resolve('../models/user');
const schemaPath = require.resolve('../schema');
const controllerPath = require.resolve('../controllers/bookingController');

const makeDate = (day) => new Date(`2030-06-${String(day).padStart(2, '0')}T00:00:00.000Z`);

const setupController = ({ existingBookings = [] } = {}) => {
  const properties = new Map();
  const MockUser = {
    findByIdAndUpdate: async () => {},
  };
  function MockBooking(data) {
    Object.assign(this, data);
    this._id = 'new-booking-id';
  }

  MockBooking.findOne = async (query) => {
    return existingBookings.find((booking) => {
      const requestedProperty = String(query.property);
      const bookingProperty = String(booking.property);
      return (
        requestedProperty === bookingProperty &&
        !query.status.$nin.includes(booking.status) &&
        booking.checkIn < query.checkIn.$lt &&
        booking.checkOut > query.checkOut.$gt
      );
    }) || null;
  };

  MockBooking.prototype.save = async function save() {
    return this;
  };

  function MockProperty(data) {
    Object.assign(this, data);
  }

  MockProperty.findById = async (id) => properties.get(String(id)) || null;
  const originalModules = {
    booking: require.cache[bookingModelPath],
    property: require.cache[propertyModelPath],
    user: require.cache[userModelPath],
    schema: require.cache[schemaPath],
    controller: require.cache[controllerPath],
  };
  const originalModuleLoad = Module._load;
  Module._load = function load(request, parent, isMain) {
    if (request === 'pdfkit') {
      return function MockPDFDocument() {};
    }
    return originalModuleLoad.call(this, request, parent, isMain);
  };

  require.cache[bookingModelPath] = { exports: MockBooking };
  require.cache[propertyModelPath] = { exports: MockProperty };
  require.cache[userModelPath] = { exports: MockUser };
  require.cache[schemaPath] = {
    exports: {
      bookingSchema: {
        validate: (body) => ({ error: null, value: body }),
      },
    },
  };
  delete require.cache[controllerPath];

  const controller = require('../controllers/bookingController');
  Module._load = originalModuleLoad;

  const restore = () => {
    Object.entries(originalModules).forEach(([name, cachedModule]) => {
      if (cachedModule) {
        require.cache[{ booking: bookingModelPath, property: propertyModelPath, user: userModelPath, schema: schemaPath, controller: controllerPath }[name]] = cachedModule;
      } else {
        delete require.cache[{ booking: bookingModelPath, property: propertyModelPath, user: userModelPath, schema: schemaPath, controller: controllerPath }[name]];
      }
    });
  };

  const addProperty = (id) => {
    const property = new MockProperty({
      _id: id,
      price: 100,
      isActive: true,
      isApproved: true,
      availability: [],
      save: async function save() {},
    });
    properties.set(String(id), property);
    return property;
  };

  return { controller, addProperty, restore };
};

const request = (property, checkInDay, checkOutDay) => ({
  body: {
    property,
    checkIn: makeDate(checkInDay).toISOString(),
    checkOut: makeDate(checkOutDay).toISOString(),
    numGuests: 2,
  },
  user: { _id: 'user-id' },
});

const response = () => {
  const result = {};
  return {
    result,
    status(code) {
      result.status = code;
      return this;
    },
    json(body) {
      result.body = body;
      return this;
    },
  };
};

const activeBooking = (property, checkInDay = 10, checkOutDay = 15, status = 'confirmed') => ({
  property,
  status,
  checkIn: makeDate(checkInDay),
  checkOut: makeDate(checkOutDay),
});

test('rejects overlapping active bookings with HTTP 409 and conflict dates', async (t) => {
  const existing = activeBooking('property-a');
  const setup = setupController({ existingBookings: [existing] });
  t.after(setup.restore);
  setup.addProperty('property-a');

  for (const [checkInDay, checkOutDay] of [[10, 15], [8, 12], [12, 18], [8, 18], [11, 14]]) {
    const res = response();
    await setup.controller.createBooking(request('property-a', checkInDay, checkOutDay), res);
    assert.equal(res.result.status, 409);
    assert.match(res.result.body.message, /not available/i);
    assert.deepEqual(res.result.body.conflictingDates, {
      checkIn: existing.checkIn,
      checkOut: existing.checkOut,
    });
  }
});

test('allows adjacent dates, canceled bookings, and bookings for another property', async (t) => {
  const setup = setupController({
    existingBookings: [
      activeBooking('property-a'),
      activeBooking('property-c', 10, 15, 'canceled'),
    ],
  });
  t.after(setup.restore);
  setup.addProperty('property-a');
  setup.addProperty('property-b');
  setup.addProperty('property-c');

  const adjacent = response();
  await setup.controller.createBooking(request('property-a', 15, 20), adjacent);
  assert.equal(adjacent.result.status, 201);

  const differentProperty = response();
  await setup.controller.createBooking(request('property-b', 12, 18), differentProperty);
  assert.equal(differentProperty.result.status, 201);

  const canceledDates = response();
  await setup.controller.createBooking(request('property-c', 12, 14), canceledDates);
  assert.equal(canceledDates.result.status, 201);
});

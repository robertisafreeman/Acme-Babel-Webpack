const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/webpack_db');
const {UUID, UUIDV4, STRING} = Sequelize;

const Person = conn.define('person', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
})

const Place = conn.define('Place', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
})

const Thing = conn.define('thing', {
  id: {
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4
  },
  name: {
    type: STRING,
    allowNull: false,
    unique: true
  }
})

const syncAndSeed = async () =>{
  await conn.sync({force: true});

  const persons = [
    {name: 'John'},
    {name: 'Bob'},
    {name: 'Joy'},
  ];
  const [john, bob, joy] = await Promise.all(persons.map(person => Person.create(person)));

  const places = [
    {name: 'NY'},
    {name: 'CA'},
    {name: 'FL'}
  ];
  const [ny, ca, fl] = await Promise.all(places.map(place => Place.create(place)));

  const things = [
    {name: 'car'},
    {name: 'dog'},
    {name: 'cat'},
  ];
  const [car, dog, cat] = await Promise.all(things.map(thing => Thing.create(thing)))
}

module.exports={
  syncAndSeed,
  model: {
    Person,
    Place,
    Thing
  }
}

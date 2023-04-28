
use("sample_restaurants")
//punto 1
//db.restaurants.find()
//punto 2
/* db.restaurants.find(
    {},{"name": 1 , "borough": 1 , "cuisine": 1}
    ); */

//punto 3
/* db.restaurants.find(
    {},{"_id": 0,"name": 1 , "borough": 1 , "cuisine": 1}
    ); */
//punto 4
/* db.restaurants.find(
    {},{"_id": 0,"name": 1 , "borough": 1 , "address.zipcode": 1}
    ); */
//punto 5
//db.restaurants.find({"borough": "Bronx"},{"name": 1, "borough": 1})
//punto 6
//db.restaurants.find({"borough": "Bronx"},{"name": 1, "borough": 1}).limit(5)
//punto 7
//db.restaurants.find({"borough": "Bronx"},{"name": 1, "borough": 1}).skip(10).limit(3)
//punto 8
//db.restaurants.find({"address.coord.0" : {$lt : -95.754168}},{"name": 1, "borough": 1, "address.coord": 1})
//punto 9
/* db.restaurants.find(
    {"name": { $regex: /^Wil/}},
    {
        "restaurant_id": 1,
        "name": 1,
        "borough": 1,
        "cuisine": 1
    }
) */
//punto 10
/* db.restaurants.find(
    {"name": { $regex: /ces$/}},
    {
        "restaurant_id": 1,
        "name": 1,
        "borough": 1,
        "cuisine": 1
    }
) */
//punto 11
/* db.restaurants.find(
    {"name": { $regex: /Reg/}},
    {
        "restaurant_id": 1,
        "name": 1,
        "borough": 1,
        "cuisine": 1
    }
) */
//punto 12
/* db.restaurants.find(
    {"name": { $regex: /mon/}},
    {
        "name": 1,
        "borough": 1,
        "address.coord": 1,
        "cuisine": 1
    }
) */
//punto 13
/* db.restaurants.find(
    {"name": { $regex: /^Mad/}},
    {
        "name": 1,
        "borough": 1,
        "address.coord": 1,
        "cuisine": 1
    }
) */
//punto 14
/* db.restaurants.find(
    {   "cuisine": { $nin: ["American", "Chinese"]},
        "name": { $regex: /^Wil/}},
    {
        "restaurant_id": 1,
        "name": 1,
        "borough": 1,
        "cuisine": 1
    }
) */
//punto 15
/* db.restaurants.find(
    {   "cuisine": { $in: ["American", "Chinese"]},
        "borough": "Bronx"
    },
    {
        "restaurant_id": 1,
        "name": 1,
        "borough": 1,
        "cuisine": 1
    }
) */
//punto 16
/* db.restaurants.find(
    {   
        "borough": { $in: ["Staten Island", "Queens", "Bronx", "Brooklyn"]}
    },
    {
        "restaurant_id": 1,
        "name": 1,
        "borough": 1,
        "cuisine": 1
    }
) */
//punto 17
/* db.restaurants.find(
    {   
        "borough": { $nin: ["Staten Island", "Queens", "Bronx", "Brooklyn"]}
    },
    {
        "restaurant_id": 1,
        "name": 1,
        "borough": 1,
        "cuisine": 1
    }
) */
//punto 18
/* db.restaurants.find(
    {   
        "grades.score": { $lt: 10}
    },
    {
        "restaurant_id": 1,
        "name": 1,
        "borough": 1,
        "cuisine": 1,
        "grades": 1
    }
) */
//punto 19
//db.restaurants.find({}).sort({"name": 1})
//punto 20
//db.restaurants.find({}).sort({"name": -1})
//punto 21
//db.restaurants.find({}).sort({"cuisine": 1, "borough": -1})
//punto 22
/* db.restaurants.find(
    {
        $or : [
            {"address.street" : /Street/},
            {
                $nor : [
                    {"address.street" : /Street/}
                ]
            }
        ]
    }
) */
//punto 23
//db.restaurants.find({ "address.coord": { $type: "double"}})
//punto 24
/* db.restaurants.find({"borough": "Queens"}).count()
db.restaurants.find({"borough": "Bronx"}).count()
db.restaurants.find({"borough": "Brooklyn"}).count() */
//punto 25
//db.restaurants.find({"borough": "Bronx", "cuisine": "American"}).count()
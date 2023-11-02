/**
 * Load the latest shared recipes from the database
 * The result is saved to res.locals.latestRecipes
 */


module.exports = function (objectrepository) {
    return function (req, res, next) {
        // Default test values for the index page
        res.locals.latestRecipes= [
            {
                _id: "1",
                title: "Chocolate Cake",
                text: "Indulge in this rich and moist chocolate cake.",
                image: "https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg",
                published: "2 hours ago",
                publishedBy: "Mary Smith",
                _publishedById: "12312bdsdcjazmtb",
            },
            {
                _id: "2",
                title: "Chocolate Chips",
                text: "Indulge in this rich and moist chocolate chips.",
                image: "https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg",
                published: "1 hours ago",
                publishedBy: "Smejk Gustavson",
                _publishedById: "12312bdsdc345345",
            },
            {
                _id: "3",
                title: "Chocolate Pie",
                text: "Indulge in this rich and moist chocolate pie.",
                image: "https://www.recipetineats.com/wp-content/uploads/2018/03/Chocolate-Cake_2.jpg",
                published: "5 hours ago",
                publishedBy: undefined,
            }
        ];
        next();
    };
};
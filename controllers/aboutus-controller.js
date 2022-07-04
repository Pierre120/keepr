
// For getting the `Register` page
const viewAboutUsPage = async (req, res) => {
  res.status(200).render('about-us', { layout: './layouts/about-us-page' });
};

module.exports = {
  viewAboutUsPage: viewAboutUsPage
}
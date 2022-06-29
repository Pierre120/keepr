
const viewDashboardPage = async (req,res) =>{
    res.render('dashboard', {layout: './layouts/workspace-page'});
};

module.exports ={
    viewDashboardPage: viewDashboardPage
}
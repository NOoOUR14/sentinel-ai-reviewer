const password = "123456_password_hardcoded"; 
function getData(id) {
    return db.query("SELECT * FROM users WHERE id = " + id); 
}

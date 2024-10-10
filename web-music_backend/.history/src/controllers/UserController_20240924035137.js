const UserService = require("../service/UserService");

const createUser = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, phone } = req.body;

        // Regex để kiểm tra email
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email);

        // Kiểm tra các trường nhập liệu
        if (!name || !email || !password || !confirmPassword || !phone) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        } 

        // Kiểm tra email hợp lệ
        if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format'
            });
        } 

        // Kiểm tra mật khẩu
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Password and Confirm Password do not match'
            });
        }

        // Gọi UserService để tạo user
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response);
        
    } catch (e) {
        return res.status(500).json({
            err: e.message || 'Internal server error',
        });
    }
};
const loginUser = async (req, res) => {
    try {
        const {  email, password } = req.body;

        // Regex để kiểm tra email
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email);

        // Kiểm tra các trường nhập liệu
        if ( !email || !password ) {
            return res.status(400).json({
                status: 'ERR',
                message: 'All fields are required'
            });
        } 

        // Kiểm tra email hợp lệ
        if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format'
            });
        } 

        // Gọi UserService để tạo user
        const response = await UserService.loginUser(req.body);
        return res.status(200).json(response);
        
    } catch (e) {
        return res.status(500).json({
            err: e.message || 'Internal server error',
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Lấy ID từ tham số đường dẫn
        const { name, email, password, confirmPassword, phone } = req.body;

        // Regex để kiểm tra email
        const reg = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const isCheckEmail = reg.test(email);


        // Kiểm tra email hợp lệ
        if (email &&!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Invalid email format'
            });
        } 

        // Kiểm tra mật khẩu nếu có thay đổi
        if (password && password !== confirmPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Password and Confirm Password do not match'
            });
        }

        // Tạo đối tượng cập nhật
        const updatedData = { name, email, phone,password,confirmPassword };

        // Gọi UserService để cập nhật thông tin người dùng
        const response = await UserService.updateUser(id, updatedData);
        return res.status(200).json(response);
        
    } catch (e) {
        return res.status(500).json({
            err: e.message || 'Internal server error',
        });
    }
};
// Hàm lấy danh sách người dùng
const getAllUsers = async (req, res) => {
    try {
        const response = await UserService.getAllUsers(); // Gọi hàm getAllUsers từ UserService
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving users',
            err: error.message,
        });
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params

    try {
        const response = await UserService.deleteUser(id); // Gọi hàm deleteUser từ UserService
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while deleting the user',
            err: error.message
        });
    }
};
module.exports = {
    createUser,
    loginUser,
    updateUser,
    getAllUsers,
    deleteUser
};

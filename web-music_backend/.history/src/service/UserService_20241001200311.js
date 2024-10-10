const User = require("../model/UserModel"); // Import model User từ MongoDB
const bcrypt = require("bcrypt"); 
const { generalAccessToken } = require('./JwtService');
const {generalRefreshToken}  = require('./JwtService');


const createUser = async (newUser) => {
    const { name, email, password, phone, isAdmin } = newUser;

    try {
        // Kiểm tra xem email đã tồn tại hay chưa
        const checkUser = await User.findOne({ email: email });
        
        if (checkUser !== null) {
            return {
                status: 'FAILED',
                message: 'The email is already registered'
            };
        }
        const hash = bcrypt.hashSync(password, 10);
        // Tạo user mới
        const createdUser = await User.create({
            name,
            email,
            password: hash,
            phone,
            isAdmin
        });

        if (createdUser) {
            return {
                status: 'OK',
                message: 'User created successfully',
                data: createdUser
            };
        } else {
            return {
                status: 'FAILED',
                message: 'Failed to create user'
            };
        }

    } catch (e) {
        // Xử lý lỗi và trả về lỗi
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: e
        };
    }
};

const loginUser = async (user) => {
    const { email, password } = user;

    try {
        // Kiểm tra xem email có tồn tại không
        const checkUser = await User.findOne({ email: email });
        
        if (checkUser === null) {
            return {
                status: 'FAILED',
                message: 'Email không tồn tại'
            };
        }
        
        // So sánh mật khẩu
        const comparePass = bcrypt.compareSync(password, checkUser.password);
        
        if (!comparePass) {
            return {
                status: 'FAILED',
                message: 'Mật khẩu không đúng'
            };
        }
        
        // Tạo access_token và refresh_token
        const access_token = await generalAccessToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin
        });
        const refresh_token = await generalRefreshToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin
        });
        
        // Trả về token và thông tin đăng nhập thành công
        return {
            status: 'OK',
            message: 'Đăng nhập thành công',
            data: {
                access_token,
                refresh_token
            }
        };

    } catch (e) {
        // Xử lý lỗi và trả về thông tin lỗi
        return {
            status: 'FAILED',
            message: 'Đã xảy ra lỗi trong quá trình đăng nhập',
            error: e.message,        // Lấy thông báo lỗi
            stack: e.stack           // Lấy stack trace của lỗi để debug
        };
    }
};


const updateUser = async (id, updatedData) => {
    try {
        // Tìm người dùng theo ID
        const user = await User.findById(id);

        if (!user) {
            return {
                status: 'FAILED',
                message: 'User not found'
            };
        }

        // Kiểm tra xem email có bị thay đổi và đã tồn tại hay chưa
        if (updatedData.email && updatedData.email !== user.email) {
            const checkUser = await User.findOne({ email: updatedData.email });
            if (checkUser) {
                return {
                    status: 'FAILED',
                    message: 'The email is already registered'
                };
            }
        }

        // Cập nhật mật khẩu nếu có
        if (updatedData.password) {
            const hash = bcrypt.hashSync(updatedData.password, 10);
            updatedData.password = hash; // Mã hóa mật khẩu mới
        }

        // Cập nhật thông tin người dùng
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        return {
            status: 'OK',
            message: 'User updated successfully',
            data: updatedUser
        };

    } catch (e) {
        // Xử lý lỗi và trả về lỗi
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: e
        };
    }
};
const getAllUsers = async () => {
    try {
        const users = await User.find(); // Tìm tất cả người dùng
        return {
            status: 'OK',
            message: 'Users retrieved successfully',
            data: users,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving users',
            err: error.message,
        };
    }
};
const getDetailUser = async (id) => {
    // Logic để lấy thông tin chi tiết của người dùng từ cơ sở dữ liệu dựa trên ID
    const user = await User.findById(id); 
    if (!user) {
        throw new Error('User not found');
    }
    return {
        status: 'OK',
        data: user
    };
};
const deleteUser = async (id) => {
    try {
        // Tìm và xóa người dùng theo ID
        const deletedUser = await User.findByIdAndDelete(id);
        
        if (!deletedUser) {
            return {
                status: 'FAILED',
                message: 'User not found'
            };
        }

        return {
            status: 'OK',
            message: 'User deleted successfully',
            data: deletedUser
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while deleting the user',
            err: error.message
        };
    }
};

const logout = async (id) => {
   
};


// các hàm
module.exports = {
    createUser,
    loginUser,
    updateUser,
    getAllUsers,
    deleteUser,
    getDetailUser,
    logout
    
};

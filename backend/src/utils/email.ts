export const user = process.env.email_user;
const pass = process.env.email_password;
export const trans_obj = {
    service: "gmail",
    auth: {
        user: user, 
        pass: pass,
    }
}
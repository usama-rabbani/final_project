import bcrypt from 'bcrypt'

export const  hashpassword = async (password)=>{
try {
    const saltRounds = 10;
    const hashedpassword = await bcrypt.hash(password, saltRounds )
    return hashedpassword
} catch (error) {
    console.log(error);
}

};
// compare password

export const Hashedpassword = (password,hashpassword)=>{
return bcrypt.compare(password,hashpassword)
}
import bcrypt from 'bcryptjs'

const hashedPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}

export default hashedPassword
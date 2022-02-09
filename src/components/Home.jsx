import React, { useState } from 'react';
function Home() {
    const [data, setData] = useState({
        uppercase: true,
        lowercase: true,
        symbol: true,
        number: true,
        length:8,
    });
    const [password, setPassword] = useState('');
    const [copied, setCopied] = useState(false);

    const generatePassword = (len) => {
        const UPPERCASE = data.uppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
        const LOWERCASE = data.lowercase ? 'abcdefghijklmnopqrstuvwxyz' : '';
        const NUMBER = data.number ? '0123456789' : '';
        const SYMBOL = data.symbol ? '!@#$%^&*()_+~`|}{[]\:;?><,./-=' : '';
        const pass = UPPERCASE + LOWERCASE + NUMBER + SYMBOL;
        let password = '';
        for (let i = 0; i < len; i++) {

            password = password + pass.charAt(Math.floor(Math.random() * pass.length));
        }
        setPassword(password);
        // return password;

    }
    const handeSubmit = (event) => {
        event.preventDefault();
        setCopied(false);
        generatePassword(data.length);

    }
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setData(prevData => {
            return ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value
            })
        })
    }
    const copyToClipboard = (event) => {
        event.preventDefault();
        navigator.clipboard.writeText(password);
        setCopied(true);
    }
    return (
        <div className='container'>
            <h1>Welcome to Password Generator!!!</h1>
            <form className='form' onSubmit={copyToClipboard} >
                <textarea className='form-password' type="text" placeholder='Generated password' name='password' value={password} disabled={true} />
                <button className='form-btn'>{copied ? 'Copied to Clipboard !!!' : 'Copy'}</button>
            </form>

            <form className='form' onSubmit={handeSubmit}>
                <input type="number" name="length" placeholder='Length of Password' pattern="^-?[0-9]\d*\.?\d*$" max={40} min={4} value={data.length} onChange={handleChange}/>
                <input type="checkbox" name="uppercase" checked={data.uppercase} onChange={handleChange} />
                <label htmlFor="uppercase"> Include UpperCase </label>
                <input type="checkbox" name="lowercase" checked={data.lowercase} onChange={handleChange} />
                <label htmlFor="lowercase"> Include LowerCase  </label>
                <input type="checkbox" name="symbol" checked={data.symbol} onChange={handleChange} />
                <label htmlFor="symbol"> Include Symbol</label>
                <input type="checkbox" name="number" checked={data.number} onChange={handleChange} />
                <label htmlFor="number"> Include Number</label>
                <button className='form-btn'>Generate Password</button>
            </form>
        </div>
    );
}

export default Home;
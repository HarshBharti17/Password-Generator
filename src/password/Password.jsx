import React, { useState, useCallback, useEffect, useRef } from "react";
import "./password.css";

function Password() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const passGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+=[]{}";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copypass = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passGen();
  }, [length, numAllowed, charAllowed, passGen]);

  return (
    <>
      <section className="bg-[linear-gradient(to_top,_#060016_5%,_#060010_100%)]">
        <div className="container">
          <div>
            <h1>Password Generator</h1>
            <input
              className="input"
              type="text"
              value={password}
              placeholder="password"
              readOnly
              ref={passRef}
            />
            <button onClick={copypass}>COPY</button>
          </div>
          <div className="cont1">
            <div className="cursor">
              <input
                className="cursor-pointer"
                type="range"
                min={8}
                max={100}
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length : {length}</label>
            </div>
            <div className="check">
              <input
                className="cursor-pointer"
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberinput"
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="">Numbers</label>
            </div>
            <div className="char">
              <input
                className="cursor-pointer"
                type="checkbox"
                defaultChecked={charAllowed}
                id="charid"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="">Characters</label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Password;
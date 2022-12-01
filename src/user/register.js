import React from 'react';
import styled from 'styled-components';
import { InputWithLable } from '../components/utily';
import { Button } from '../components/button';
import { isEmail, isNumber, isUsername, isChinese, isContainSpecial } from '../utils/utils';
import "./register.css";

export default function Register() {

  React.useEffect(()=>{
    document.title = "THE.TOP | 创建账户";
  }, [])

  const [username, setUsername] = React.useState({check: false,value: ""});
  const [email, setEmail] = React.useState({check: false,value: ""});
  const [password, setPassword] = React.useState({check: false,value: ""});
  const [isStepOneOk, setIsStepOneOk] = React.useState(false);
  const [isStepTwoOk, setIsStepTwoOk] = React.useState(true);
  const [step, setStep] = React.useState(1);

  React.useEffect(()=>{
    if (username.check && email.check && password.check) {
      setIsStepOneOk(true);
    } else {
      setIsStepOneOk(false);
    }
  }, [username, email, password]);
  
  const handleSubmit = () => {
    console.log("submit");
  }

  return (
    <div className="register-main">
      <div className="title-wraper">
        <div className="title">THE.TOP LINK</div>
      </div>
      <div className="register-wraper">
        <div className="register-box">
          {step == 1 && <RegisterBase setEmail={setEmail} setPassword={setPassword} setUsername={setUsername}></RegisterBase>}
          {step == 2 && <CompleteData></CompleteData>}
          <div className='register-action'>
            
            {(step == 1 && isStepOneOk) ? 
              <Button primary onClick={()=>{setStep(2)}}>下一步</Button>:
              step == 1 && <Button>下一步</Button>
            }
            {(step == 2 && isStepTwoOk) ?
              <Button primary onClick={handleSubmit}>完成</Button>:
              step ==2 && <Button>完成</Button>  
            }
          </div>
        </div>
      </div>
    </div>
  )
}


function RegisterBase(props) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [tipUsername, setTipUsername] = React.useState({
    color: "white",
    text: "用户名长度为 4-16 个字符",
  });

  const [tipEmail, setTipEmail] = React.useState({
    color: "white",
    text: "邮箱长度为 4-16 个字符",
  })

  const [tipPass, setTipPass] = React.useState({
    color: "white",
    text: "密码长度为 6-16 个字符",
  })

  const checkUsername = (value) => { 
    if (isUsername(value) && !isNumber(value)) {
      setTipUsername({color: "green", text: "用户名可用"})
      props.setUsername({check: true, value: value});
    } else {
      props.setUsername({check: false, value: value});
      if(value.length === 0) {
        setTipUsername({color: "black",text: "用户名长度为 4-16 个字符"})
      } else if (value.length < 4) {
        setTipUsername({color: "red",text: "用户名长度不得小于 4 个字符"})
      } else if (value.length > 16) {
        setTipUsername({color: "red",text: "用户名长度不得大于 16 个字符"})
      } else if (value.length >= 4 && value.length <= 16 && isNumber(value)) {
        setTipUsername({color: "red",text: "用户名不得为纯数字"})
      } else if (isContainSpecial(value)) {
        setTipUsername({color: "red",text: "用户名不得包含特殊字符"})
      } else if (isChinese(value)) {
        setTipUsername({color: "red",text: "用户名不得包含中文"})
      }
    }
  }

  const handleUsernameChange = (username) => {
    setUsername(username)
    checkUsername(username);
  }

  const handleEmailChange = (email) => {
    console.log("email", email);
    setEmail(email)
    if (isEmail(email)) {
      setTipEmail({color: "green", text: "邮箱可用"})
      props.setEmail({check: true, value: email});
    } else {
      setTipEmail({color: "red", text: "邮箱格式不正确"})
      props.setEmail({check: false, value: email});
    }
  }

  const handlePasswordChange = (password) => {
    setPassword(password);
    if (password.length >= 6 && password.length <= 16) {
      setTipPass({color: "green", text: "密码可用"})
      props.setPassword({check: true, value: password});
    } else {
      setTipPass({color: "red", text: "密码长度为 6-16 个字符"})
      props.setPassword({check: false, value: password});
    }
  }

  return (
    <>
       <div className="register-title">创建账户</div>
          <InputWithLable title={"the.top/"} placeholder={"用户名"} color={tipUsername.color} onChange={handleUsernameChange} content={username}></InputWithLable>
          <InputTips color={tipUsername.color}>{tipUsername.text}</InputTips> 

          <InputWithLable title={"邮箱"}  placeholder={"请输入邮箱"} color={tipEmail.color} onChange={handleEmailChange} content={email}></InputWithLable>
          <InputTips color={tipEmail.color}>{tipEmail.text}</InputTips> 

          <InputWithLable title={"密码"}  placeholder={"请输入密码"} color={tipPass.color} onChange={handlePasswordChange} content={password}></InputWithLable>
          <InputTips color={tipPass.color}>{tipPass.text}</InputTips>  
    </>
  )
}


const InputTipsMain = styled.div`
  font-size: 14px;
  color: ${props => props.color ? props.color : "white"};
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

function InputTips(props) {
  return (
    <InputTipsMain isOverLength={props.isOverLength} color={props.color}>
      {props.children}
    </InputTipsMain>
  )
}

function CompleteData() {
  return (
    <>
    <div className="register-title">完善资料</div>
 </>
)}
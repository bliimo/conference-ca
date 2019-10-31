import React, { Component } from 'react';
import { Page, Link, Preloader, List, ListButton, ListInput,Navbar,NavTitle } from 'framework7-react';
import { connect } from 'react-redux';
import { addAuth, setData, setStorage, getStorage } from '../../../reducers/reducer';
import poweredBy from '../../../img/icons/bliimo-white-msap.png'
import style from './style.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstname: '',
      middlename: '',
      lastname: '',
      repassword: '',
      logging: false,
      isRegister:false,
      modalText:''
    };
  }

  componentWillMount() {
    const uid = getStorage('uid');
    if (uid) {
      this.$f7router.navigate('/Home');
    }
  }

  onHandleRegister = async () => {
    let { email, password, firstname, middlename, lastname, repassword } = this.state;
    this.setState({ logging: true });
    if (password !== repassword) {
      this.setState({modalText:'Password and re-type password should same'})
    } else {
      const data = await addAuth(email, password);
      if (data.response === 'success') {
        let userData = { accountID: data.id, firstname, middlename, lastname, email, status: false, profilePicture: '' };
        await setData(`user/${data.id}`, userData);
        setStorage({ uid: data.id });
        this.setState({modalText:'Successfully registered',isRegister:true})
      } else if (data.error.code === 'auth/network-request-failed') {
        this.setState({modalText:'No internet',isRegister:false})
      } else if (data.error.code === 'auth/email-already-in-use') {
        this.setState({modalText:'Email already used',isRegister:false})
      } else {
        this.setState({modalText:'Invalid Credentials',isRegister:false})
      }
    }
    this.setState({ logging: false });
  };

  HandleDisplayModal = () =>{
    this.setState({modalText:''})
    if(this.state.isRegister){
      this.$f7router.navigate('/');
    }
  }

  render() {
    return (
      <Page pageContent={false}>
       {this.state.modalText === '' && <div>
      <img src={poweredBy} alt='' className='poweredBy' style={{top:'.1em !important'}}/>
      <div id='top-nav' className='top-nav' style-={{paddingTop:'2.5em !important'}}>
        <Link
            iconF7="chevron_left"
            color="white"
            className="back-button" 
            onClick={() => {
              this.$f7router.navigate('/');
            }}
            style={{padding:0}}
          ></Link>
        <span id="top-title" className="top-title" style={{display:'inline-block',width:'100% !important',textAlign:'center',fontSize:'2em !important'}}>Register</span>
       </div>
        <div className="page no-navbar no-toolbar no-swipeback" style={{marginTop:'6em'}}>
          <div className="page-content login-screen-content signup-page">
            <Preloader color="white" className="loading" style={{ display: this.state.logging ? 'block' : 'none', position: 'absolute', top: '50%', left: '50%',zIndex:'999999999999' }}></Preloader>
            <List form style={{ display: this.state.logging ? 'none' : 'block',padding:'.5em' }}>
              <ListInput
                value={this.state.firstname}
                onInput={e => {
                  this.setState({ firstname: e.target.value });
                }}
                label="Firstname"
                type="text"
                placeholder="Firstname"
              />
              <ListInput
                value={this.state.lastname}
                onInput={e => {
                  this.setState({ lastname: e.target.value });
                }}
                label="Lastname"
                type="text"
                placeholder="Lastname"
              />
              <ListInput
                value={this.state.middlename}
                onInput={e => {
                  this.setState({ middlename: e.target.value });
                }}
                label="Middlename"
                type="text"
                placeholder="Middlename"
              />
              <ListInput
                value={this.state.email}
                onInput={e => {
                  this.setState({ email: e.target.value });
                }}
                label="Email"
                type="email"
                placeholder="Email"
              />
              <ListInput
                value={this.state.password}
                onInput={e => {
                  this.setState({ password: e.target.value });
                }}
                label="Password"
                type="password"
                placeholder="Password"
              />
              <ListInput
                value={this.state.repassword}
                onInput={e => {
                  this.setState({ repassword: e.target.value });
                }}
                label="Re-type Password"
                type="password"
                placeholder="Re-type Password"
              />
              <ListButton className='btn-reg' style={{color:'#fff !important'}} onClick={() => this.onHandleRegister()}>Register</ListButton>
            </List>
          </div>
        </div>
        </div>}
        {this.state.modalText !== '' && (<div className='modal-alert-wrapper'><div className='modal-alert'>
          <span>{this.state.modalText}</span>
          <a href='javascript:void(0)' onClick={()=>{this.HandleDisplayModal()}}>Ok</a>
        </div></div>)}
      </Page>
    );
  }
}

const mapStateToProps = state => {
  return {
    authState: state.authState
  };
};

const mapDispatchToProps = {
  addAuth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

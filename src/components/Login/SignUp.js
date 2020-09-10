import React, { useState } from 'react';
import {
  Layout,
  Steps,
  Row,
  Col,
  Select,
  Form,
  Button,
  Input,
  InputNumber,
  Divider,
} from 'antd';
import wallet from 'wallet-besu';
import { Main } from '@aragon/ui';
import 'antd/dist/antd.css';
import './SingnUp.Style.css';

// Destructing
const { Header, Content, Footer, Sider } = Layout;
const { Password } = Input;
const { Step } = Steps;
const { Option, OptGroup } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

// const prefixSelector = (
//   <Form.Item name='prefix' noStyle>
//     <Select
//       style={{
//         width: 70,
//       }}
//     >
//       <Option value='86'>+86</Option>
//       <Option value='87'>+87</Option>
//     </Select>
//   </Form.Item>
// );
const Signup = () => {
  // state for stepper
  const [current, setCurrent] = useState(0);

  // network
  const [network, setNetwork] = useState(0);

  // name
  const [name, setName] = useState('');

  // zip
  const [zip, setZip] = useState('');

  // phone
  const [phone, setPhone] = useState('');

  // email
  const [email, setEmail] = useState('');

  // role
  const [role, setRole] = useState('');

  // password
  const [password, setPassword] = useState('');

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  async function registerUser() {
    const status = await wallet.create(password, 'oriankey123');
    console.log(status);
  }

  const submitForm = () => {
    const onFinish = (values) => {
      console.log(values);
    };
  };

  return (
    <Main layout={false}>
      <Layout className='layout'>
        <Content
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <Col span={18}>
            <Content>
              <div className='header'>
                <h2>Welcome to Arbchain</h2>
              </div>
              <Form
                {...layout}
                id='form'
                className='login-form'
                name='nest-messages'
                onFinish={registerUser}
                validateMessages={validateMessages}
              >
                <Divider dashed />

                <Form.Item label='Select Network' className='login-form'>
                  <Select
                    label='Field A'
                    defaultValue='Node1'
                    onChange={handleChange}
                  >
                    <OptGroup label='Networks'>
                      <Option value='n1'>Node1</Option>
                      <Option value='n2'>Node2</Option>
                    </OptGroup>
                  </Select>
                </Form.Item>

                <Form.Item
                  name={['user', 'name']}
                  label='Name'
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name='zip'
                  label='Zip Code'
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your Zip code!',
                    },
                  ]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  name='phone'
                  label='Phone Number'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your phone number!',
                    },
                  ]}
                >
                  <Input style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  name={['user', 'email']}
                  label='Email'
                  rules={[
                    {
                      type: 'email',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label='Role'>
                  <Select
                    label='Role'
                    defaultValue='Role'
                    onChange={handleChange}
                  >
                    <OptGroup label='Networks'>
                      <Option value='Role1'>Arbitrator</Option>
                      <Option value='Role2'>Claiment</Option>
                    </OptGroup>
                  </Select>
                </Form.Item>
                <Form.Item label='Password'>
                  <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type='primary' htmlType='submit'>
                    Sign up
                  </Button>
                </Form.Item>
              </Form>
            </Content>
          </Col>
        </Content>
      </Layout>
    </Main>
  );
};

export default Signup;

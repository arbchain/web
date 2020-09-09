import React, { useState } from 'react';
import { Layout, Steps, Row, Col, Select, Form, Button } from 'antd';
import wallet from 'wallet-besu';
import { Main } from '@aragon/ui';
import 'antd/dist/antd.css';
import './SingnUp.Style.css';

const { Header, Content, Footer, Sider } = Layout;
const { Step } = Steps;
const { Option, OptGroup } = Select;

const Signup = () => {
  const [current, setCurrent] = useState(0);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  async function registerUser() {
    const status = await wallet.create('password123', 'oriankey123');
    console.log(status);
  }

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
          <Row gutter={[48, 0]}>
            <Col span={6}>
              <Content className='col-1'>
                <Steps
                  current={current}
                  onChange={(current) => {
                    setCurrent(current);
                  }}
                  direction='vertical'
                >
                  <Step title='Select Network' />
                  <Step title='User Information' />
                  <Step title='Create Account' />
                </Steps>
              </Content>
            </Col>
            <Col span={18}>
              <Content className='col-2'>
                <div className='header'>
                  <h2>Welcome to Arbchain</h2>
                </div>
                <Form layout='vertical' id='form' className='login-form'>
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

                  <Form.Item>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='login-form-button'
                    >
                      Log in
                    </Button>
                  </Form.Item>

                  <Button onClick={registerUser}>Generate Password</Button>
                </Form>
              </Content>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Main>
  );
};

export default Signup;

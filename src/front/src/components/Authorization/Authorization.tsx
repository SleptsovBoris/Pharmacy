import { Link } from 'react-router-dom';
import './Authorization.scss';
import { Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { login } from 'api/endpoints/account';
import { ILoginData } from 'api/types/account';
import { IAccount, setUser } from 'redux/ducks/account';
import { useDispatch } from 'react-redux';

const Authorization: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const loginData = {
      phone: form.getFieldValue('phone'),
      password: form.getFieldValue('password'),
    } as ILoginData;

    console.log(loginData.phone, loginData.password);

    login(loginData).then(response => {
      if (!response.data.data || !response.data.accessToken) return;

      dispatch(
        setUser({
          token: response.data!.accessToken,
          type: response.data.data.isAnonymous ? 'anonymous' : 'authorized',
          phone: response.data.data.phone,
        } as IAccount)
      );
    });

    navigate('/');
  };

  return (
    <div className="authorization__area">
      <div className="authorization__box">
        <div className="authorization__title">Авторизация</div>

        <Form form={form}>
          <Form.Item name={'phone'} required>
            <div className="input__area">
              <div className="template">+7</div>
              <input className="input__box" placeholder="Телефон" />
            </div>
          </Form.Item>
          <Form.Item name={'password'} required>
            <div className="input__area">
              <input className="input__box2" placeholder="Пароль" />
            </div>
          </Form.Item>
        </Form>

        <button className="authorization__button" onClick={handleLogin}>
          Авторизоваться
        </button>
        <Link to="/registration" className="go_to_registry">
          Нет аккаунта, перейти к регистрации
        </Link>
      </div>
    </div>
  );
};

export default Authorization;

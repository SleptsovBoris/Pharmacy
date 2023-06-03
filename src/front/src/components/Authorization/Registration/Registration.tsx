import { Form } from 'antd';
import '../Authorization.scss';
import { signUp } from 'api/endpoints/account';
import { ISignUpData } from 'api/types/account';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IAccount, setUser } from 'redux/ducks/account';

const Registration: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    const signUpData = {
      phone: form.getFieldValue('phone'),
      password: form.getFieldValue('password'),
    } as ISignUpData;

    signUp(signUpData).then(response => {
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
        <div className="authorization__title">Регистрация</div>

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

        <button className="authorization__button" onClick={handleSignUp}>
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default Registration;

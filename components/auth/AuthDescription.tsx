import { FunctionComponent } from 'react';
// Components
import Link from 'next/link';
// Styles
import styles from '@styles/Auth.module.scss';
// Types
import { AuthDescriptionType } from '@Types/content';

const AuthDescription: FunctionComponent<{ content: AuthDescriptionType }> = ({
  content,
}) => (
  <div className={styles['login-description']}>
    <div>
      <h1>{content.title}</h1>
      <div>{content.description}</div>
      <div className='mt-20'>
        <div className='form-link mt-20'>
          {content.linkAnswer}&nbsp;
          <Link href={content.link}>{content.linkText}</Link>
        </div>
      </div>
    </div>
  </div>
);

export default AuthDescription;

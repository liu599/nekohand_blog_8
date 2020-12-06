import styles from './index.css';
import {
  Link,
  connect,
  getLocale,
  setLocale,
  useIntl,
} from 'umi';
import { Helmet } from 'umi';

export default function() {
  const intl = useIntl();
  return (
    <div className={styles.normal}>
      <ul className={styles.list}>
        <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            {intl.formatMessage(
              {
                id: 'name',
                defaultMessage: '你好，旅行者',
              },
              {
                name: '旅行者',
              },
            )}
          </a>
        </li>
      </ul>
    </div>
  );
}

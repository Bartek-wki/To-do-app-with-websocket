import { Row, Col } from "react-bootstrap";
import styles from './Header.module.scss'

const Header = () => (
  <Row className={styles.header}>
    <Col className={styles.name}>
      Be more productive today !
    </Col>
  </Row>
);

export default Header;
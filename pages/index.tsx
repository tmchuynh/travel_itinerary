"use client"

import { Container } from 'react-bootstrap';
import styles from './page.module.css';
import GlobeVisualization from './components/globe';
import  AutoComplete  from './components/autocomplete';

export default function Home(): JSX.Element {

  return (
    <Container fluid className={styles.container}>
      <h1>Travel</h1>
      <AutoComplete  />
      <GlobeVisualization />
    </Container>
  );
}

"use client"

import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import styles from './page.module.css';
import GlobeVisualization from './components/globe';
import { AutoComplete } from './components/autocomplete';

export default function Home(): JSX.Element {
  const router = useRouter();

  return (
    <Container fluid className={styles.container}>
      <h1>Travel</h1>
      <AutoComplete router={router} />
      <GlobeVisualization />
    </Container>
  );
}

import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './components/Layout'
import Hero from './components/Hero'
import Features from './components/Features'
import Documentation from './components/Documentation'

export default function App() {
  return (
    <Router>
      <Layout>
        <Hero />
        <Features />
        <Documentation />
      </Layout>
    </Router>
  )
}

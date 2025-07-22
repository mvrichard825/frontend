import FamilyForm from './components/FamilyForm';
import MemberList from './components/MemberList';
import './App.css';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>👨‍👩‍👧‍👦 Family Member Registration</h1>
      <FamilyForm />
      <hr style={{ margin: '2rem 0' }} />
      <MemberList />
    </div>
  );
}

export default App;

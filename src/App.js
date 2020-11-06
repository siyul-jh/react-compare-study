import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styled from 'styled-components';
import './default.css';

const StyledBtn = styled.button`
	display:inline-block;
	padding: 1rem;
	margin: 1rem;
	border-radius: 8px;
	border: none;
	& a {
		color: #fff;
		font-size: 24px;
		font-weight: bold;
		text-decoration-line:none;
	}

	&:focus {
		outline: none;
	}
	&:hover {
		box-shadow: 0px 0px 5px #333;
	}
`;

function App() {
	return (
		<div style={{ textAlign: 'center' }}>
			<StyledBtn style={{ backgroundColor: '#fb9717' }}>
				<Link to='./class'>클레스형 계산기</Link>
			</StyledBtn>
			<StyledBtn style={{ backgroundColor: '#9797fb' }}>
				<Link to='./function'>함수형 계산기</Link>
			</StyledBtn>
		</div>
	);
}

export default App;

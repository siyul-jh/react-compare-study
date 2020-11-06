import React, { useState,useEffect, useRef } from 'react';
import point from 'react-point';
const PointTarget = point;

function AutoScalingText({children}) {
	const [scale,setScale] = useState(1);
	const node = useRef(null);
	useEffect(() => {
		const parentNode = node.current.parentNode;
		const availableWidth = parentNode.offsetWidth;
		const actualWidth = node.current.offsetWidth;
		const actualScale = availableWidth / actualWidth;
		if (scale === actualScale) return;
		if (actualScale < 1) {
			setScale(actualScale)
		} else if (scale < 1) {
			setScale(1)
		}
	});
	return(
		<div className='auto-scaling-text' style={{ transform: `scale(${scale},${scale})` }} ref={node}>
			{children}
		</div>
	)
}

function CalculatorDisplay({value,...props}) {

		const language = navigator.language || 'en-US';
		let formattedValue = parseFloat(value).toLocaleString(language, {
			useGrouping: true,
			maximumFractionDigits: 6,
		});

		// Add back missing .0 in e.g. 12.0
		const match = value.match(/\.\d*?(0*)$/);

		if (match) formattedValue += /[1-9]/.test(match[0]) ? match[1] : match[0];
	return (
		<div {...props} className='calculator-display'>
			<AutoScalingText>{formattedValue}</AutoScalingText>
		</div>
	)
}

function CalculatorKey( { onPress, className, ...props }) {
	return (
		<PointTarget onPoint={onPress}>
			<button className={`calculator-key ${className}`} {...props} />
		</PointTarget>
	);
}

const CalculatorOperations = {
	'/': (prevValue, nextValue) => prevValue / nextValue,
	'*': (prevValue, nextValue) => prevValue * nextValue,
	'+': (prevValue, nextValue) => prevValue + nextValue,
	'-': (prevValue, nextValue) => prevValue - nextValue,
	'=': (prevValue, nextValue) => nextValue,
};

export default function Calculator_new() {
	const [value, setValue] = useState(null);
	const [displayValue, setDisplayValue] = useState('0');
	const [operator, setOperator] = useState(null);
	const [waitingForOperand, setWaitingForOperand] = useState(false);

	const clearAll = () => {
		setValue(null);
		setDisplayValue('0');
		setOperator(null);
		setWaitingForOperand(false);
	}

	const clearDisplay = () => {
		setDisplayValue('0');
	}

	const clearLastChar = () => {
		setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0')
	}

	const toggleSign = () => {
		const newValue = parseFloat(displayValue) * -1;
		setDisplayValue(String(newValue));
	}

	const inputPercent = () => {
		const currentValue = parseFloat(displayValue);

		if (currentValue === 0) return;

		const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
		const newValue = parseFloat(displayValue) / 100;
		setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
	}

	const inputDot =() => {
		if (!/\./.test(displayValue)) {
			setDisplayValue(displayValue + '.')
			setWaitingForOperand(false)
		}
	}

	const inputDigit = (digit) => {
		if (waitingForOperand) {
			setDisplayValue(String(digit))
			setWaitingForOperand(false)
		} else {
			setDisplayValue( displayValue === '0' ? String(digit) : displayValue + digit)
		}
	}

	const performOperation =(nextOperator) => {
		const inputValue = parseFloat(displayValue);

		if (value == null) {
			setValue(inputValue)
		} else if (operator) {
			const currentValue = value || 0;
			const newValue = CalculatorOperations[operator](currentValue, inputValue);
			setValue(newValue)
			setDisplayValue(String(newValue))
		}
			setWaitingForOperand(true)
			setOperator(nextOperator)
	}

	const handleKeyDown = (event) => {
		let { key } = event;

		if (key === 'Enter') key = '=';

		if (/\d/.test(key)) {
			event.preventDefault();
			inputDigit(parseInt(key, 10));
		} else if (key in CalculatorOperations) {
			event.preventDefault();
			performOperation(key);
		} else if (key === '.') {
			event.preventDefault();
			inputDot();
		} else if (key === '%') {
			event.preventDefault();
			inputPercent();
		} else if (key === 'Backspace') {
			event.preventDefault();
			clearLastChar();
		} else if (key === 'Clear') {
			event.preventDefault();

			if (displayValue !== '0') {
				clearDisplay();
			} else {
				clearAll();
			}
		}
	};

	useEffect(() => {
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		}
	}, [])

	const cDisplay = displayValue!=='0';
	const cText = cDisplay ? 'C' : 'AC';
	return(
		<div id="wrapper">
  				<div id="app">
				  	<h1 style={{textAlign:'center'}}><span style={{color:'#9797fb'}}>함수형</span> 계산기</h1>
					<button type="button" 
				  		style={{padding:'1rem', margin:'1rem 0', width:'100%', textAlign:'center', backgroundColor:'#1c191c', color:'#fff', fontSize:'18px',fontWeight:'bold'}} 
				  		onClick={()=> window.history.back()}
					>
					뒤로가기
					</button>
					<div className='calculator'>
						<CalculatorDisplay value={displayValue} />
						<div className='calculator-keypad'>
							<div className='input-keys'>
								<div className='function-keys'>
									<CalculatorKey className='key-clear' onPress={() => (cDisplay ? clearDisplay() : clearAll())}>
										{cText}
									</CalculatorKey>
									<CalculatorKey className='key-sign' onPress={() => toggleSign()}>
										±
									</CalculatorKey>
									<CalculatorKey className='key-percent' onPress={() => inputPercent()}>
										%
									</CalculatorKey>
								</div>
								<div className='digit-keys'>
									<CalculatorKey className='key-0' onPress={() => inputDigit(0)}>
										0
									</CalculatorKey>
									<CalculatorKey className='key-dot' onPress={() => inputDot()}>
										●
									</CalculatorKey>
									<CalculatorKey className='key-1' onPress={() => inputDigit(1)}>
										1
									</CalculatorKey>
									<CalculatorKey className='key-2' onPress={() => inputDigit(2)}>
										2
									</CalculatorKey>
									<CalculatorKey className='key-3' onPress={() => inputDigit(3)}>
										3
									</CalculatorKey>
									<CalculatorKey className='key-4' onPress={() => inputDigit(4)}>
										4
									</CalculatorKey>
									<CalculatorKey className='key-5' onPress={() => inputDigit(5)}>
										5
									</CalculatorKey>
									<CalculatorKey className='key-6' onPress={() => inputDigit(6)}>
										6
									</CalculatorKey>
									<CalculatorKey className='key-7' onPress={() => inputDigit(7)}>
										7
									</CalculatorKey>
									<CalculatorKey className='key-8' onPress={() => inputDigit(8)}>
										8
									</CalculatorKey>
									<CalculatorKey className='key-9' onPress={() => inputDigit(9)}>
										9
									</CalculatorKey>
								</div>
							</div>
							<div className='operator-keys'>
								<CalculatorKey className='key-divide' onPress={() => performOperation('/')}>
									÷
								</CalculatorKey>
								<CalculatorKey className='key-multiply' onPress={() => performOperation('*')}>
									×
								</CalculatorKey>
								<CalculatorKey className='key-subtract' onPress={() => performOperation('-')}>
									−
								</CalculatorKey>
								<CalculatorKey className='key-add' onPress={() => performOperation('+')}>
									+
								</CalculatorKey>
								<CalculatorKey className='key-equals' onPress={() => performOperation('=')}>
									=
								</CalculatorKey>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};

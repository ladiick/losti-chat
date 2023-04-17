import React, {useState, Fragment} from 'react';
import {BsCheckCircleFill} from "react-icons/bs";
import {RadioGroup} from "@headlessui/react";
import s from './RadioGroup.module.scss'
import Title from "../Title/Title";
import Text from '../Text/Text'

const RadioButtonGroup = ({names, title, toggle,currentIndex}) => {

	const [name, setName] = useState(names[currentIndex])

	return (
		<RadioGroup value={name} onChange={setName}>
			<Title level={4}>
				{title}
			</Title>
			{names.map((name) => (
				/* Use the `active` state to conditionally style the active option. */
				/* Use the `checked` state to conditionally style the checked option. */
				<RadioGroup.Option key={name} value={name} as={Fragment}>
					{({active, checked}) => (
						<li
							className={s.radio__item}
							onClick={()=>toggle(name)}
						>
							<span className={s.not__select}
							      style={checked ? {borderColor: 'var(--text--accent)'} : {}}>
							{
								checked ?
									<BsCheckCircleFill
										fill='var(--text--accent)'/>
									: ''
							}
							</span>
							<Text style={{marginLeft: 8}}>{name}</Text>
						</li>
					)}
				</RadioGroup.Option>
			))}
		</RadioGroup>
	)
};

export default RadioButtonGroup;

import { RadioGroup } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import Text from "../Text/Text";
import Typography from "../Typography/Typography";
import s from "./RadioGroup.module.scss";

const RadioButtonGroup = ({ names, title, toggle, currentIndex, descriptionTitle, classWrapperEl }) => {
  const [name, setName] = useState(names[currentIndex] || "");

  return (
    <RadioGroup value={name} onChange={setName}>
      {descriptionTitle ? <Text>{descriptionTitle}</Text> : <Typography level={4}>{title}</Typography>}
      <div className={classWrapperEl}>
        {names.map((name) => (
          <RadioGroup.Option key={name} value={name} as={Fragment}>
            {({ active, checked }) => (
              <li className={s.radio__item} onClick={() => toggle(name)}>
                <span className={s.not__select} style={checked ? { borderColor: "var(--text--accent)" } : {}}>
                  {checked ? <BsCheckCircleFill fill="var(--text--accent)" /> : ""}
                </span>
                <Text style={{ marginLeft: 8 }}>{name}</Text>
              </li>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default RadioButtonGroup;

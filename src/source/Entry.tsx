import { useState } from "react";

interface IEntry {
  keyy: string;
  value: string;
  onValueChange: (newValue: string) => void;
}

export const Entry = ({ keyy, value, onValueChange }: IEntry) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeButtonClick = () => {
    setIsEditing(true);
  };

  const handleChangeCompleteButtonClick = (text: string) => {
    setIsEditing(false);
    onValueChange(text);
  };

  const handleChangeCancelButtonClick = () => {
    setIsEditing(false);
  };

  return (
    <div key={keyy} style={styles.container}>
      {isEditing ? (
        <ChangingEntry
          keyy={keyy}
          value={value}
          onChangeCancelButtonClick={handleChangeCancelButtonClick}
          onChangeCompleteButtonClick={handleChangeCompleteButtonClick}
        />
      ) : (
        <DefaultEntry
          keyy={keyy}
          value={value}
          onChangeButtonClick={handleChangeButtonClick}
        />
      )}
    </div>
  );
};

interface IChangingEntry {
  keyy: string;
  value: string;
  onChangeCompleteButtonClick: (text: string) => void;
  onChangeCancelButtonClick: () => void;
}

const ChangingEntry = ({
  keyy,
  onChangeCompleteButtonClick,
  onChangeCancelButtonClick,
}: IChangingEntry) => {
  const [changedValue, setChangedValue] = useState<string>("");

  const handleTextInputChange = (text: string) => {
    setChangedValue(text);
  };

  return (
    <div style={styles.container}>
      <div style={styles.text}>
        <a>{keyy + ":"}</a>
        <input
          value={changedValue}
          size={10}
          onChange={(e) => handleTextInputChange(e.target.value)}
        />
      </div>
      <div style={styles.buttons}>
        <div onClick={onChangeCancelButtonClick} style={styles.changeButton}>
          отмена
        </div>
        <div
          onClick={() => onChangeCompleteButtonClick(changedValue)}
          style={styles.changeButton}
        >
          готово
        </div>
      </div>
    </div>
  );
};

interface IDefaultEntry {
  keyy: string;
  value: string;
  onChangeButtonClick: () => void;
}

const DefaultEntry = ({ keyy, value, onChangeButtonClick }:IDefaultEntry) => {
  return (
    <div style={styles.container}>
      <div style={styles.text}>
        <a>{keyy + ": " + value}</a>
      </div>
      <div style={styles.buttons}>
        <div onClick={onChangeButtonClick} style={styles.changeButton}>
          <a>редачить</a>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "100%",
    minHeight: "40px",
    backgroundColor: "blue",
    marginBottom: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px",
    color: "white",
    borderRadius: "8px",
    flexShrink: 0,
  },
  text: {
    height: "100%",
  },
  buttons: {},
  changeButton: {
    width: "20px",
    height: "20px",
    backgroundColor: "brown",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

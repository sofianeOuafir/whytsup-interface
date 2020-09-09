const Assets = ({ assets, onClick, buttonText }) => {
  return (
    <ul>
      {assets.map(({ id, name, code }, index) => (
        <li key={index}>
          <span>
            {name} - {code}
          </span>
          <button onClick={() => onClick(id)}>{buttonText}</button>
        </li>
      ))}
    </ul>
  );
};

export default Assets;

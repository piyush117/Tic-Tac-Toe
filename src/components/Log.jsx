export default function Log({turns}) {
    return(
        <ol id="log">
            {turns.map((turn, index) => (
                <li key={index}>
                    {`${turn.player} selected square at row ${turn.square.row}, col ${turn.square.col}`}
                </li>
            ))}
        </ol>
    );
} 
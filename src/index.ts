import colors from "colors";
import server from "./server";

server.listen(4000, () => {
    console.log(colors.cyan.bold('Rest AI 4000'));
})
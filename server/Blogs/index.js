"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
const errorHandler_1 = __importDefault(require("./errors/errorHandler"));
const keys_1 = require("./config/keys");
const app = (0, express_1.default)();
const isLocal = keys_1.NODE_ENV === 'development';
const corsOptions = {
    origin: isLocal ? keys_1.ALLOW_ORIGIN : undefined,
    credentials: isLocal ? true : false,
};
app.use(helmet_1.default.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        'img-src': ["'self'", 'https: data:'],
    },
}));
app.use((0, cors_1.default)(corsOptions));
app.use((0, morgan_1.default)(isLocal == true ? 'dev' : 'tiny'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', user_routes_1.default);
app.use('/api', blog_routes_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'build')));
app.get('*', (req, res) => res.sendFile(path_1.default.join(__dirname, '..', 'build', 'index.html')));
app.use(errorHandler_1.default);
app.listen(keys_1.PORT, () => {
    console.log(`\nctrl + click http://localhost:${keys_1.PORT}\nctrl + c to stop server`);
});

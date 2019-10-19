--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2 (Debian 11.2-1.pgdg90+1)
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: dept; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public.dept (
    id integer NOT NULL,
    pid integer,
    name character varying(255),
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.dept OWNER TO zzzk;

--
-- Name: COLUMN dept.id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.dept.id IS 'ID';


--
-- Name: COLUMN dept.pid; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.dept.pid IS '上级部门';


--
-- Name: COLUMN dept.name; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.dept.name IS '名称';


--
-- Name: COLUMN dept.state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.dept.state IS '状态';


--
-- Name: dept_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.dept_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dept_id_seq OWNER TO zzzk;

--
-- Name: dept_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.dept_id_seq OWNED BY public.dept.id;


--
-- Name: job; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public.job (
    id integer NOT NULL,
    name character varying(255),
    sort integer DEFAULT 999,
    dept_id integer,
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.job OWNER TO zzzk;

--
-- Name: COLUMN job.id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.job.id IS 'ID';


--
-- Name: COLUMN job.name; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.job.name IS '名称';


--
-- Name: COLUMN job.sort; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.job.sort IS '排序';


--
-- Name: COLUMN job.dept_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.job.dept_id IS '所属部门';


--
-- Name: COLUMN job.state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.job.state IS '状态';


--
-- Name: job_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.job_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.job_id_seq OWNER TO zzzk;

--
-- Name: job_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.job_id_seq OWNED BY public.job.id;


--
-- Name: log; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public.log (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    exception_detail character varying(255),
    log_type character varying(255) DEFAULT 'success'::character varying,
    method character varying(255),
    params character varying(255),
    request_ip character varying(255),
    "time" integer,
    address character varying(255),
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.log OWNER TO zzzk;

--
-- Name: COLUMN log.id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log.id IS 'ID';


--
-- Name: COLUMN log.name; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log.name IS '用户名';


--
-- Name: COLUMN log.description; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log.description IS '描述信息';


--
-- Name: COLUMN log.exception_detail; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log.exception_detail IS '异常信息';


--
-- Name: COLUMN log.log_type; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log.log_type IS '类型';


--
-- Name: COLUMN log.method; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log.method IS '方法';


--
-- Name: COLUMN log.params; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log.params IS '参数';


--
-- Name: COLUMN log.request_ip; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log.request_ip IS 'IP';


--
-- Name: COLUMN log."time"; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log."time" IS '耗时';


--
-- Name: COLUMN log.address; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log.address IS 'IP来源';


--
-- Name: COLUMN log.state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.log.state IS '状态';


--
-- Name: log_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.log_id_seq OWNER TO zzzk;

--
-- Name: log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.log_id_seq OWNED BY public.log.id;


--
-- Name: menu; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public.menu (
    id integer NOT NULL,
    name character varying(255),
    path character varying(255),
    pid integer,
    sort integer DEFAULT 999,
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.menu OWNER TO zzzk;

--
-- Name: COLUMN menu.id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.menu.id IS 'ID';


--
-- Name: COLUMN menu.name; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.menu.name IS '名称';


--
-- Name: COLUMN menu.path; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.menu.path IS '路径';


--
-- Name: COLUMN menu.pid; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.menu.pid IS '上级菜单';


--
-- Name: COLUMN menu.sort; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.menu.sort IS '排序';


--
-- Name: COLUMN menu.state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.menu.state IS '状态';


--
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.menu_id_seq OWNER TO zzzk;

--
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;


--
-- Name: permission; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public.permission (
    id integer NOT NULL,
    name character varying(255),
    alias character varying(255),
    pid integer,
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.permission OWNER TO zzzk;

--
-- Name: COLUMN permission.id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.permission.id IS 'ID';


--
-- Name: COLUMN permission.name; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.permission.name IS '名称';


--
-- Name: COLUMN permission.alias; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.permission.alias IS '别名';


--
-- Name: COLUMN permission.pid; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.permission.pid IS '上级权限';


--
-- Name: COLUMN permission.state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.permission.state IS '状态';


--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.permission_id_seq OWNER TO zzzk;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying(255),
    remark character varying(255),
    scope character varying(255),
    level integer,
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.role OWNER TO zzzk;

--
-- Name: COLUMN role.id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.role.id IS 'ID';


--
-- Name: COLUMN role.name; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.role.name IS '名称';


--
-- Name: COLUMN role.remark; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.role.remark IS '备注';


--
-- Name: COLUMN role.scope; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.role.scope IS '权限范围';


--
-- Name: COLUMN role.level; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.role.level IS '级别';


--
-- Name: COLUMN role.state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.role.state IS '状态';


--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.role_id_seq OWNER TO zzzk;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: roles_depts; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public.roles_depts (
    id integer NOT NULL,
    role_id integer,
    dept_id integer,
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.roles_depts OWNER TO zzzk;

--
-- Name: COLUMN roles_depts.id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_depts.id IS 'ID';


--
-- Name: COLUMN roles_depts.role_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_depts.role_id IS '角色ID';


--
-- Name: COLUMN roles_depts.dept_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_depts.dept_id IS '部门ID';


--
-- Name: COLUMN roles_depts.state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_depts.state IS '状态';


--
-- Name: roles_depts_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.roles_depts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_depts_id_seq OWNER TO zzzk;

--
-- Name: roles_depts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.roles_depts_id_seq OWNED BY public.roles_depts.id;


--
-- Name: roles_menus; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public.roles_menus (
    id integer NOT NULL,
    role_id integer,
    menu_id integer,
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.roles_menus OWNER TO zzzk;

--
-- Name: COLUMN roles_menus.id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_menus.id IS 'ID';


--
-- Name: COLUMN roles_menus.role_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_menus.role_id IS '角色ID';


--
-- Name: COLUMN roles_menus.menu_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_menus.menu_id IS '菜单ID';


--
-- Name: COLUMN roles_menus.state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_menus.state IS '状态';


--
-- Name: roles_menus_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.roles_menus_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_menus_id_seq OWNER TO zzzk;

--
-- Name: roles_menus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.roles_menus_id_seq OWNED BY public.roles_menus.id;


--
-- Name: roles_permissions; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public.roles_permissions (
    id integer NOT NULL,
    role_id integer,
    permission_id integer,
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.roles_permissions OWNER TO zzzk;

--
-- Name: COLUMN roles_permissions.id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_permissions.id IS 'ID';


--
-- Name: COLUMN roles_permissions.role_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_permissions.role_id IS '角色ID';


--
-- Name: COLUMN roles_permissions.permission_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_permissions.permission_id IS '权限ID';


--
-- Name: COLUMN roles_permissions.state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.roles_permissions.state IS '状态';


--
-- Name: roles_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.roles_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_permissions_id_seq OWNER TO zzzk;

--
-- Name: roles_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.roles_permissions_id_seq OWNED BY public.roles_permissions.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    name character varying(255),
    password character varying(255),
    avatar character varying(255) DEFAULT 'https://source.unsplash.com/zBmcEepz5FQ/256x256'::character varying,
    email character varying(255),
    phone character varying(255),
    dept_id integer,
    job_id integer,
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public."user" OWNER TO zzzk;

--
-- Name: COLUMN "user".id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public."user".id IS 'ID';


--
-- Name: COLUMN "user".dept_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public."user".dept_id IS '部门ID';


--
-- Name: COLUMN "user".job_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public."user".job_id IS '岗位ID';


--
-- Name: COLUMN "user".state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public."user".state IS '状态';


--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO zzzk;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: users_roles; Type: TABLE; Schema: public; Owner: zzzk
--

CREATE TABLE public.users_roles (
    id integer NOT NULL,
    role_id integer,
    user_id integer,
    state character varying(255) DEFAULT 'on'::character varying,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users_roles OWNER TO zzzk;

--
-- Name: COLUMN users_roles.id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.users_roles.id IS 'ID';


--
-- Name: COLUMN users_roles.role_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.users_roles.role_id IS '角色ID';


--
-- Name: COLUMN users_roles.user_id; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.users_roles.user_id IS '用户ID';


--
-- Name: COLUMN users_roles.state; Type: COMMENT; Schema: public; Owner: zzzk
--

COMMENT ON COLUMN public.users_roles.state IS '状态';


--
-- Name: users_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: zzzk
--

CREATE SEQUENCE public.users_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_roles_id_seq OWNER TO zzzk;

--
-- Name: users_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: zzzk
--

ALTER SEQUENCE public.users_roles_id_seq OWNED BY public.users_roles.id;


--
-- Name: dept id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.dept ALTER COLUMN id SET DEFAULT nextval('public.dept_id_seq'::regclass);


--
-- Name: job id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.job ALTER COLUMN id SET DEFAULT nextval('public.job_id_seq'::regclass);


--
-- Name: log id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.log ALTER COLUMN id SET DEFAULT nextval('public.log_id_seq'::regclass);


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);


--
-- Name: permission id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: roles_depts id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.roles_depts ALTER COLUMN id SET DEFAULT nextval('public.roles_depts_id_seq'::regclass);


--
-- Name: roles_menus id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.roles_menus ALTER COLUMN id SET DEFAULT nextval('public.roles_menus_id_seq'::regclass);


--
-- Name: roles_permissions id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.roles_permissions ALTER COLUMN id SET DEFAULT nextval('public.roles_permissions_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: users_roles id; Type: DEFAULT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.users_roles ALTER COLUMN id SET DEFAULT nextval('public.users_roles_id_seq'::regclass);


--
-- Data for Name: dept; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public.dept (id, pid, name, state, created_at, updated_at) FROM stdin;
1	0	中正智控	on	2019-10-18 00:26:03.01+00	2019-10-18 00:26:03.01+00
2	1	华南分部	on	2019-10-18 00:26:03.011+00	2019-10-18 00:26:03.011+00
3	1	\b华北分部	on	2019-10-18 00:26:03.011+00	2019-10-18 00:26:03.011+00
4	2	研发部	on	2019-10-18 00:26:03.011+00	2019-10-18 00:26:03.011+00
5	2	运维部	on	2019-10-18 00:26:03.012+00	2019-10-18 00:26:03.012+00
6	2	财务部	on	2019-10-18 00:26:03.012+00	2019-10-18 00:26:03.012+00
7	2	市场部	on	2019-10-18 00:26:03.012+00	2019-10-18 00:26:03.012+00
8	3	测试部	on	2019-10-18 00:26:03.012+00	2019-10-18 00:26:03.012+00
10	3	人事部	on	2019-10-18 00:26:03.012+00	2019-10-18 00:26:03.012+00
9	3	行政部	on	2019-10-18 00:26:03.012+00	2019-10-18 00:26:03.012+00
\.


--
-- Data for Name: job; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public.job (id, name, sort, dept_id, state, created_at, updated_at) FROM stdin;
1	董事长	1	1	on	2019-10-18 00:26:03.013+00	2019-10-18 00:26:03.013+00
2	董事长秘书	2	1	on	2019-10-18 00:26:03.013+00	2019-10-18 00:26:03.013+00
3	人事专员	3	10	on	2019-10-18 00:26:03.013+00	2019-10-18 00:26:03.013+00
4	产品经理	4	4	on	2019-10-18 00:26:03.013+00	2019-10-18 00:26:03.013+00
5	软件测试	5	4	on	2019-10-18 00:26:03.014+00	2019-10-18 00:26:03.014+00
6	全栈开发	6	4	on	2019-10-18 00:26:03.014+00	2019-10-18 00:26:03.014+00
\.


--
-- Data for Name: log; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public.log (id, name, description, exception_detail, log_type, method, params, request_ip, "time", address, state, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public.menu (id, name, path, pid, sort, state, created_at, updated_at) FROM stdin;
1	系统管理	admin	0	1	on	2019-10-18 00:26:03.014+00	2019-10-18 00:26:03.014+00
2	用户管理	admin/user	1	2	on	2019-10-18 00:26:03.014+00	2019-10-18 00:26:03.014+00
3	角色管理	admin/role	1	3	on	2019-10-18 00:26:03.014+00	2019-10-18 00:26:03.014+00
35	部门管理	admin/dept	1	6	on	2019-10-18 00:26:03.014+00	2019-10-18 00:26:03.014+00
37	岗位管理	admin/job	1	7	on	2019-10-18 00:26:03.015+00	2019-10-18 00:26:03.015+00
28	定时任务	admin/timing/index	36	21	on	2019-10-18 00:26:03.015+00	2019-10-18 00:26:03.015+00
39	字典管理	admin/dict/index	1	8	on	2019-10-18 00:26:03.015+00	2019-10-18 00:26:03.015+00
4	权限管理	admin/permission/index	1	4	on	2019-10-18 00:26:03.015+00	2019-10-18 00:26:03.015+00
5	菜单管理	admin/menu/index	1	5	on	2019-10-18 00:26:03.015+00	2019-10-18 00:26:03.015+00
7	操作日志	monitor/log/index	6	11	on	2019-10-18 00:26:03.015+00	2019-10-18 00:26:03.015+00
6	系统监控	monitor	0	10	on	2019-10-18 00:26:03.015+00	2019-10-18 00:26:03.015+00
8	系统缓存	monitor/redis/index	6	13	on	2019-10-18 00:26:03.015+00	2019-10-18 00:26:03.015+00
9	SQL监控	monitor/sql/index	6	14	on	2019-10-18 00:26:03.016+00	2019-10-18 00:26:03.016+00
10	组件管理	components	0	50	on	2019-10-18 00:26:03.016+00	2019-10-18 00:26:03.016+00
11	图标库	components/IconSelect	10	51	on	2019-10-18 00:26:03.016+00	2019-10-18 00:26:03.016+00
14	邮件工具	tools/email/index	36	24	on	2019-10-18 00:26:03.016+00	2019-10-18 00:26:03.016+00
15	富文本	components/Editor	10	52	on	2019-10-18 00:26:03.016+00	2019-10-18 00:26:03.016+00
16	图床管理	tools/picture/index	36	25	on	2019-10-18 00:26:03.016+00	2019-10-18 00:26:03.016+00
19	支付宝工具	tools/aliPay/index	36	27	on	2019-10-18 00:26:03.016+00	2019-10-18 00:26:03.016+00
18	存储管理	tools/storage/index	36	23	on	2019-10-18 00:26:03.016+00	2019-10-18 00:26:03.016+00
21	多级菜单	nested	0	900	on	2019-10-18 00:26:03.017+00	2019-10-18 00:26:03.017+00
22	二级菜单1	nested/menu1/index	21	999	on	2019-10-18 00:26:03.017+00	2019-10-18 00:26:03.017+00
23	二级菜单2	nested/menu2/index	21	999	on	2019-10-18 00:26:03.017+00	2019-10-18 00:26:03.017+00
24	三级菜单1	nested/menu1/menu1-1	22	999	on	2019-10-18 00:26:03.017+00	2019-10-18 00:26:03.017+00
30	代码生成	generator/index	36	22	on	2019-10-18 00:26:03.017+00	2019-10-18 00:26:03.017+00
27	三级菜单2	nested/menu1/menu1-2	22	999	on	2019-10-18 00:26:03.017+00	2019-10-18 00:26:03.017+00
32	异常日志	monitor/log/errorLog	6	12	on	2019-10-18 00:26:03.017+00	2019-10-18 00:26:03.017+00
33	Markdown	components/MarkDown	10	53	on	2019-10-18 00:26:03.017+00	2019-10-18 00:26:03.017+00
34	Yaml编辑器	components/YamlEdit	10	54	on	2019-10-18 00:26:03.017+00	2019-10-18 00:26:03.017+00
36	系统工具	tools	0	20	on	2019-10-18 00:26:03.018+00	2019-10-18 00:26:03.018+00
38	接口文档	tools/swagger/index	36	26	on	2019-10-18 00:26:03.018+00	2019-10-18 00:26:03.018+00
\.


--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public.permission (id, name, alias, pid, state, created_at, updated_at) FROM stdin;
1	超级管理员	admin	0	on	2019-10-18 00:26:03.018+00	2019-10-18 00:26:03.018+00
2	用户管理	user	0	on	2019-10-18 00:26:03.018+00	2019-10-18 00:26:03.018+00
3	用户查询	list	2	on	2019-10-18 00:26:03.018+00	2019-10-18 00:26:03.018+00
4	用户创建	add	2	on	2019-10-18 00:26:03.019+00	2019-10-18 00:26:03.019+00
5	用户编辑	edit	2	on	2019-10-18 00:26:03.019+00	2019-10-18 00:26:03.019+00
6	用户删除	del	2	on	2019-10-18 00:26:03.019+00	2019-10-18 00:26:03.019+00
7	角色管理	role	0	on	2019-10-18 00:26:03.019+00	2019-10-18 00:26:03.019+00
8	角色查询	list	7	on	2019-10-18 00:26:03.019+00	2019-10-18 00:26:03.019+00
10	角色创建	add	7	on	2019-10-18 00:26:03.019+00	2019-10-18 00:26:03.019+00
11	角色编辑	edit	7	on	2019-10-18 00:26:03.019+00	2019-10-18 00:26:03.019+00
12	角色删除	del	7	on	2019-10-18 00:26:03.019+00	2019-10-18 00:26:03.019+00
13	菜单编辑	menu_edit	7	on	2019-10-18 00:26:03.019+00	2019-10-18 00:26:03.019+00
14	权限编辑	permission_edit	7	on	2019-10-18 00:26:03.02+00	2019-10-18 00:26:03.02+00
15	权限管理	PERMISSION_ALL	0	on	2019-10-18 00:26:03.02+00	2019-10-18 00:26:03.02+00
16	权限查询	PERMISSION_SELECT	15	on	2019-10-18 00:26:03.02+00	2019-10-18 00:26:03.02+00
17	权限创建	PERMISSION_CREATE	15	on	2019-10-18 00:26:03.02+00	2019-10-18 00:26:03.02+00
18	权限编辑	PERMISSION_EDIT	15	on	2019-10-18 00:26:03.02+00	2019-10-18 00:26:03.02+00
19	权限删除	PERMISSION_DELETE	15	on	2019-10-18 00:26:03.02+00	2019-10-18 00:26:03.02+00
20	缓存管理	REDIS_ALL	0	on	2019-10-18 00:26:03.02+00	2019-10-18 00:26:03.02+00
21	缓存查询	REDIS_SELECT	20	on	2019-10-18 00:26:03.021+00	2019-10-18 00:26:03.021+00
22	缓存删除	REDIS_DELETE	20	on	2019-10-18 00:26:03.021+00	2019-10-18 00:26:03.021+00
23	图床管理	PICTURE_ALL	0	on	2019-10-18 00:26:03.021+00	2019-10-18 00:26:03.021+00
24	查询图片	PICTURE_SELECT	23	on	2019-10-18 00:26:03.021+00	2019-10-18 00:26:03.021+00
25	上传图片	PICTURE_UPLOAD	23	on	2019-10-18 00:26:03.021+00	2019-10-18 00:26:03.021+00
26	删除图片	PICTURE_DELETE	23	on	2019-10-18 00:26:03.021+00	2019-10-18 00:26:03.021+00
29	菜单管理	MENU_ALL	0	on	2019-10-18 00:26:03.021+00	2019-10-18 00:26:03.021+00
30	菜单查询	MENU_SELECT	29	on	2019-10-18 00:26:03.021+00	2019-10-18 00:26:03.021+00
31	菜单创建	MENU_CREATE	29	on	2019-10-18 00:26:03.022+00	2019-10-18 00:26:03.022+00
32	菜单编辑	MENU_EDIT	29	on	2019-10-18 00:26:03.022+00	2019-10-18 00:26:03.022+00
33	菜单删除	MENU_DELETE	29	on	2019-10-18 00:26:03.022+00	2019-10-18 00:26:03.022+00
36	任务查询	JOB_SELECT	35	on	2019-10-18 00:26:03.022+00	2019-10-18 00:26:03.022+00
35	定时任务管理	JOB_ALL	0	on	2019-10-18 00:26:03.022+00	2019-10-18 00:26:03.022+00
37	任务创建	JOB_CREATE	35	on	2019-10-18 00:26:03.022+00	2019-10-18 00:26:03.022+00
38	任务编辑	JOB_EDIT	35	on	2019-10-18 00:26:03.022+00	2019-10-18 00:26:03.022+00
39	任务删除	JOB_DELETE	35	on	2019-10-18 00:26:03.022+00	2019-10-18 00:26:03.022+00
40	部门管理	DEPT_ALL	0	on	2019-10-18 00:26:03.023+00	2019-10-18 00:26:03.023+00
41	部门查询	DEPT_SELECT	40	on	2019-10-18 00:26:03.023+00	2019-10-18 00:26:03.023+00
42	部门创建	DEPT_CREATE	40	on	2019-10-18 00:26:03.023+00	2019-10-18 00:26:03.023+00
43	部门编辑	DEPT_EDIT	40	on	2019-10-18 00:26:03.023+00	2019-10-18 00:26:03.023+00
44	部门删除	DEPT_DELETE	40	on	2019-10-18 00:26:03.023+00	2019-10-18 00:26:03.023+00
45	岗位管理	USERJOB_ALL	0	on	2019-10-18 00:26:03.023+00	2019-10-18 00:26:03.023+00
46	岗位查询	USERJOB_SELECT	45	on	2019-10-18 00:26:03.023+00	2019-10-18 00:26:03.023+00
47	岗位创建	USERJOB_CREATE	45	on	2019-10-18 00:26:03.024+00	2019-10-18 00:26:03.024+00
48	岗位编辑	USERJOB_EDIT	45	on	2019-10-18 00:26:03.024+00	2019-10-18 00:26:03.024+00
49	岗位删除	USERJOB_DELETE	45	on	2019-10-18 00:26:03.024+00	2019-10-18 00:26:03.024+00
50	字典管理	DICT_ALL	0	on	2019-10-18 00:26:03.024+00	2019-10-18 00:26:03.024+00
51	字典查询	DICT_SELECT	50	on	2019-10-18 00:26:03.024+00	2019-10-18 00:26:03.024+00
52	字典创建	DICT_CREATE	50	on	2019-10-18 00:26:03.024+00	2019-10-18 00:26:03.024+00
53	字典编辑	DICT_EDIT	50	on	2019-10-18 00:26:03.024+00	2019-10-18 00:26:03.024+00
54	字典删除	DICT_DELETE	50	on	2019-10-18 00:26:03.025+00	2019-10-18 00:26:03.025+00
55	文件管理	LOCALSTORAGE_ALL	0	on	2019-10-18 00:26:03.025+00	2019-10-18 00:26:03.025+00
56	文件搜索	LOCALSTORAGE_SELECT	55	on	2019-10-18 00:26:03.025+00	2019-10-18 00:26:03.025+00
57	文件上传	LOCALSTORAGE_CREATE	55	on	2019-10-18 00:26:03.025+00	2019-10-18 00:26:03.025+00
58	文件编辑	LOCALSTORAGE_EDIT	55	on	2019-10-18 00:26:03.025+00	2019-10-18 00:26:03.025+00
59	文件删除	LOCALSTORAGE_DELETE	55	on	2019-10-18 00:26:03.025+00	2019-10-18 00:26:03.025+00
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public.role (id, name, remark, scope, level, state, created_at, updated_at) FROM stdin;
1	超级管理员	·	all	1	on	2019-10-18 00:26:03.026+00	2019-10-18 00:26:03.026+00
2	普通管理员	普通管理员级别为2，使用该角色新增用户时只能赋予比普通管理员级别低的角色	diy	2	on	2019-10-18 00:26:03.026+00	2019-10-18 00:26:03.026+00
3	普通用户	用于测试菜单与权限	diy	3	on	2019-10-18 00:26:03.026+00	2019-10-18 00:26:03.026+00
\.


--
-- Data for Name: roles_depts; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public.roles_depts (id, role_id, dept_id, state, created_at, updated_at) FROM stdin;
2	3	8	on	2019-10-18 00:26:03.027+00	2019-10-18 00:26:03.027+00
1	2	5	on	2019-10-18 00:26:03.026+00	2019-10-18 00:26:03.026+00
3	3	2	on	2019-10-18 00:26:03.027+00	2019-10-18 00:26:03.027+00
4	2	3	on	2019-10-18 00:26:03.027+00	2019-10-18 00:26:03.027+00
5	2	6	on	2019-10-18 00:26:03.027+00	2019-10-18 00:26:03.027+00
\.


--
-- Data for Name: roles_menus; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public.roles_menus (id, role_id, menu_id, state, created_at, updated_at) FROM stdin;
1	3	1	on	2019-10-18 00:26:03.027+00	2019-10-18 00:26:03.027+00
2	3	2	on	2019-10-18 00:26:03.028+00	2019-10-18 00:26:03.028+00
3	3	3	on	2019-10-18 00:26:03.028+00	2019-10-18 00:26:03.028+00
4	3	4	on	2019-10-18 00:26:03.028+00	2019-10-18 00:26:03.028+00
5	3	5	on	2019-10-18 00:26:03.028+00	2019-10-18 00:26:03.028+00
6	3	6	on	2019-10-18 00:26:03.028+00	2019-10-18 00:26:03.028+00
7	3	8	on	2019-10-18 00:26:03.028+00	2019-10-18 00:26:03.028+00
8	3	9	on	2019-10-18 00:26:03.028+00	2019-10-18 00:26:03.028+00
9	3	10	on	2019-10-18 00:26:03.028+00	2019-10-18 00:26:03.028+00
10	3	11	on	2019-10-18 00:26:03.029+00	2019-10-18 00:26:03.029+00
11	3	14	on	2019-10-18 00:26:03.029+00	2019-10-18 00:26:03.029+00
12	3	15	on	2019-10-18 00:26:03.029+00	2019-10-18 00:26:03.029+00
13	3	17	on	2019-10-18 00:26:03.029+00	2019-10-18 00:26:03.029+00
14	3	16	on	2019-10-18 00:26:03.029+00	2019-10-18 00:26:03.029+00
15	3	18	on	2019-10-18 00:26:03.029+00	2019-10-18 00:26:03.029+00
16	3	19	on	2019-10-18 00:26:03.029+00	2019-10-18 00:26:03.029+00
17	3	21	on	2019-10-18 00:26:03.029+00	2019-10-18 00:26:03.029+00
18	3	23	on	2019-10-18 00:26:03.03+00	2019-10-18 00:26:03.03+00
19	3	27	on	2019-10-18 00:26:03.03+00	2019-10-18 00:26:03.03+00
20	3	24	on	2019-10-18 00:26:03.03+00	2019-10-18 00:26:03.03+00
21	3	22	on	2019-10-18 00:26:03.03+00	2019-10-18 00:26:03.03+00
22	3	28	on	2019-10-18 00:26:03.03+00	2019-10-18 00:26:03.03+00
23	3	30	on	2019-10-18 00:26:03.03+00	2019-10-18 00:26:03.03+00
24	3	34	on	2019-10-18 00:26:03.03+00	2019-10-18 00:26:03.03+00
25	3	33	on	2019-10-18 00:26:03.03+00	2019-10-18 00:26:03.03+00
26	3	35	on	2019-10-18 00:26:03.031+00	2019-10-18 00:26:03.031+00
27	3	36	on	2019-10-18 00:26:03.031+00	2019-10-18 00:26:03.031+00
28	3	37	on	2019-10-18 00:26:03.031+00	2019-10-18 00:26:03.031+00
29	3	38	on	2019-10-18 00:26:03.031+00	2019-10-18 00:26:03.031+00
30	3	39	on	2019-10-18 00:26:03.031+00	2019-10-18 00:26:03.031+00
31	2	1	on	2019-10-18 00:26:03.031+00	2019-10-18 00:26:03.031+00
32	2	2	on	2019-10-18 00:26:03.031+00	2019-10-18 00:26:03.031+00
\.


--
-- Data for Name: roles_permissions; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public.roles_permissions (id, role_id, permission_id, state, created_at, updated_at) FROM stdin;
1	1	1	on	2019-10-18 00:26:03.032+00	2019-10-18 00:26:03.032+00
2	2	3	on	2019-10-18 00:26:03.032+00	2019-10-18 00:26:03.032+00
3	2	4	on	2019-10-18 00:26:03.032+00	2019-10-18 00:26:03.032+00
4	2	5	on	2019-10-18 00:26:03.033+00	2019-10-18 00:26:03.033+00
5	3	3	on	2019-10-18 00:26:03.033+00	2019-10-18 00:26:03.033+00
6	3	8	on	2019-10-18 00:26:03.033+00	2019-10-18 00:26:03.033+00
7	3	14	on	2019-10-18 00:26:03.033+00	2019-10-18 00:26:03.033+00
8	3	20	on	2019-10-18 00:26:03.033+00	2019-10-18 00:26:03.033+00
9	3	23	on	2019-10-18 00:26:03.033+00	2019-10-18 00:26:03.033+00
10	3	24	on	2019-10-18 00:26:03.033+00	2019-10-18 00:26:03.033+00
11	3	25	on	2019-10-18 00:26:03.033+00	2019-10-18 00:26:03.033+00
12	3	26	on	2019-10-18 00:26:03.033+00	2019-10-18 00:26:03.033+00
13	3	30	on	2019-10-18 00:26:03.033+00	2019-10-18 00:26:03.033+00
14	3	36	on	2019-10-18 00:26:03.034+00	2019-10-18 00:26:03.034+00
15	3	41	on	2019-10-18 00:26:03.034+00	2019-10-18 00:26:03.034+00
16	3	46	on	2019-10-18 00:26:03.034+00	2019-10-18 00:26:03.034+00
17	3	51	on	2019-10-18 00:26:03.034+00	2019-10-18 00:26:03.034+00
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public."user" (id, name, password, avatar, email, phone, dept_id, job_id, state, created_at, updated_at) FROM stdin;
1	admin	e10adc3949ba59abbe56e057f20f883e	https://source.unsplash.com/zBmcEepz5FQ/256x256	admin@eladmin.net	18888888888	4	6	on	2019-10-18 00:25:44.265+00	2019-10-18 00:25:44.265+00
2	test	e10adc3949ba59abbe56e057f20f883e	https://source.unsplash.com/zBmcEepz5FQ/256x256	test@eladmin.net	17777777777	4	5	on	2019-10-18 00:25:44.265+00	2019-10-18 00:25:44.265+00
3	hr	e10adc3949ba59abbe56e057f20f883e	https://source.unsplash.com/zBmcEepz5FQ/256x256	hr@eladmin.net	15555555555	10	3	on	2019-10-18 00:25:44.265+00	2019-10-18 00:25:44.265+00
\.


--
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: zzzk
--

COPY public.users_roles (id, role_id, user_id, state, created_at, updated_at) FROM stdin;
1	1	1	on	2019-10-18 00:26:03.034+00	2019-10-18 00:26:03.034+00
2	2	2	on	2019-10-18 00:26:03.034+00	2019-10-18 00:26:03.034+00
3	3	3	on	2019-10-18 00:26:03.034+00	2019-10-18 00:26:03.034+00
\.


--
-- Name: dept_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.dept_id_seq', 1, false);


--
-- Name: job_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.job_id_seq', 1, false);


--
-- Name: log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.log_id_seq', 1, false);


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.menu_id_seq', 1, false);


--
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.permission_id_seq', 1, false);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.role_id_seq', 1, false);


--
-- Name: roles_depts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.roles_depts_id_seq', 1, false);


--
-- Name: roles_menus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.roles_menus_id_seq', 32, true);


--
-- Name: roles_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.roles_permissions_id_seq', 17, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.user_id_seq', 1, false);


--
-- Name: users_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: zzzk
--

SELECT pg_catalog.setval('public.users_roles_id_seq', 3, true);


--
-- Name: dept dept_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.dept
    ADD CONSTRAINT dept_pkey PRIMARY KEY (id);


--
-- Name: job job_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.job
    ADD CONSTRAINT job_pkey PRIMARY KEY (id);


--
-- Name: log log_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_pkey PRIMARY KEY (id);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: role role_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT role_pkey PRIMARY KEY (id);


--
-- Name: roles_depts roles_depts_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.roles_depts
    ADD CONSTRAINT roles_depts_pkey PRIMARY KEY (id);


--
-- Name: roles_menus roles_menus_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.roles_menus
    ADD CONSTRAINT roles_menus_pkey PRIMARY KEY (id);


--
-- Name: roles_permissions roles_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT roles_permissions_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: users_roles users_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: zzzk
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT users_roles_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


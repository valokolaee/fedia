/**
 * PeriodCycle.Api — rebuilt with the same architecture as your webService project:
 * declarative ModelApi objects, one endpoint() helper, one useApi() hook.
 *
 * Key difference from your other API: this backend returns RAW DTOs directly
 * (e.g. GET /api/Articles returns ArticleResponseDto[] as the whole body, not
 * wrapped in {success, data}). Errors come back as { message: string } with a
 * non-2xx status. So the response envelope logic is simpler here — no need to
 * check a `success` flag inside the body, only the HTTP status matters.
 */

/* ============================================================ */
/*  ModelApi.ts                                                  */
/* ============================================================ */

export type AxType = 'get' | 'post' | 'put' | 'delete';

export interface ModelApi<TReq = any, TRes = any> {
  folderUrl: string;          // e.g. 'Articles'
  axiosType: AxType;
  apiUrl?: string | number;   // e.g. an id, or 'mine', 'me', 'predict-next'
  apiUrl2?: string | number;  // e.g. 'image', 'view', 'like'
  query?: Record<string, string | number | boolean | undefined>;
  body?: TReq;
  isFormData?: boolean;
  /** phantom field — never set at runtime, exists so callApi() can infer TRes */
  __res?: TRes;
}

/* ============================================================ */
/*  apiUrlService.ts                                             */
/* ============================================================ */

const BASE_URL = 'https://api.fedialife.ir/';
const API_PREFIX = 'api/';

const buildQueryString = (query?: ModelApi['query']): string => {
  if (!query) return '';
  const parts = Object.entries(query)
    .filter(([, v]) => v !== undefined && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  return parts.length ? `?${parts.join('&')}` : '';
};

export const buildUrl = (model: ModelApi): string => {
  const segments = [model.folderUrl, model.apiUrl, model.apiUrl2].filter(
    (s) => s !== undefined && s !== null && s !== ''
  );
  return `${BASE_URL}${API_PREFIX}${segments.join('/')}${buildQueryString(model.query)}`;
};

/* ============================================================ */
/*  endpoint.ts — the only two builders you ever need             */
/* ============================================================ */

type EndpointConfig = Omit<ModelApi, 'body' | 'query' | '__res'>;

/** Route that takes a request body (POST/PUT) or an id (GET/DELETE by id). */
export const endpoint =
  <TReq = void, TRes = any>(cfg: EndpointConfig) =>
  (bodyOrId?: TReq, query?: ModelApi['query']): ModelApi<TReq, TRes> =>
    ({ ...cfg, body: bodyOrId, query } as ModelApi<TReq, TRes>);

/** No-argument route (e.g. GET /Cycles/mine, GET /Users/me). */
export const noBodyEndpoint = <TRes = any>(cfg: EndpointConfig): ModelApi<never, TRes> =>
  ({ ...cfg } as ModelApi<never, TRes>);

/** Route with an id in the path PLUS a body (PUT /Articles/{id}, POST /Articles/{id}/image). */
export const idBodyEndpoint =
  <TReq = void, TRes = any>(cfg: EndpointConfig) =>
  (id: number, body: TReq): ModelApi<TReq, TRes> =>
    ({ ...cfg, apiUrl: id, body } as ModelApi<TReq, TRes>);

/** Route with just an id in the path (GET/DELETE /Articles/{id}, POST /Articles/{id}/like). */
export const idEndpoint =
  <TRes = any>(cfg: EndpointConfig) =>
  (id: number): ModelApi<never, TRes> =>
    ({ ...cfg, apiUrl: id } as ModelApi<never, TRes>);

/* ============================================================ */
/*  DTO types (input + output) — same as the earlier types file  */
/* ============================================================ */

export interface ApiErrorDto { message: string; }

// Auth
export interface RegisterDto { mobile: string; pin: string; email: string; firstName: string; lastName: string; birthDate: string; maritalStatus: string; }
export interface LoginDto { mobile: string; pin: string; }
export interface ForgotPinDto { mobile: string; }
export interface TokenResponseDto { accessToken: string; accessTokenExpireAt: string; }

// Articles
export interface ArticleResponseDto { id: number; type: string; categoryId: number; categoryName: string; timeRead: number; title: string; desc: string; imagePath: string; countView: number; countLike: number; countDislike: number; createDate: string; }
export interface CreateArticleRequestDto { type: string; categoryId: number; timeRead: number; title: string; desc: string; }
export interface UpdateArticleRequestDto { type: string; categoryId: number; timeRead: number; title: string; desc: string; imagePath: string; }

// CategoryArticles
export interface CategoryArticleResponseDto { id: number; name: string; }
export interface CreateCategoryArticleRequestDto { name: string; }
export interface UpdateCategoryArticleRequestDto { name: string; }

// Comments
export interface CommentResponseDto { id: number; userId: number; commentText: string; createDate: string; articleId: number; status: string; }
export interface CreateCommentRequestDto { articleId: number; commentText: string; }

// Cycles
export interface CycleResponseDto { id: number; userId: number; startDate: string; lastDate: string; periodLengthDays: number; cycleLengthDays: number; createDate: string; }
export interface CreateCycleRequestDto { startDate?: string; lastDate?: string; periodLengthDays?: number; cycleLengthDays?: number; }
export interface PredictNextCycleResponseDto { nextCycleStartDate: string; }

// DailySymptoms
export interface DailySymptomResponseDto { id: number; userId: number; cycleId: number; questionId: number; answerId: number; cycleDay: number; createDate: string; }
export interface CreateDailySymptomRequestDto { cycleId: number; questionId: number; answerId: number; cycleDay: number; }

// Note
export interface NoteImageResponseDto { id: number; imageName: string; url: string; }
export interface NoteResponseDto { id: number; icon: string; title: string; desc: string; createDate: string; images: NoteImageResponseDto[]; }

// Pregnancies
export interface PregnancyResponseDto { id: number; userId: number; status: string; createDate: string; }
export interface CreatePregnancyRequestDto { status: string; }
export interface UpdatePregnancyStatusRequestDto { status: string; }

// Questions
export interface QuestionOptionDto { id: number; text: string; }
export interface QuestionResponseDto { id: number; text: string; options: QuestionOptionDto[]; }

// Users
export interface UserProfileDto { id: number; mobile: string; email: string; firstName: string; lastName: string; birthDate: string; maritalStatus: string; role: string; createDate: string; cycleCount: number; }
export interface UpdateProfileDto { firstName: string; lastName: string; birthDate: string; maritalStatus: string; }

/* ============================================================ */
/*  apis/index.ts  — the API list itself                         */
/* ============================================================ */

export const auth = {
  register: endpoint<RegisterDto, TokenResponseDto>({ folderUrl: 'Auth', apiUrl: 'register', axiosType: 'post' }),
  login: endpoint<LoginDto, TokenResponseDto>({ folderUrl: 'Auth', apiUrl: 'login', axiosType: 'post' }),
  refreshToken: noBodyEndpoint<TokenResponseDto>({ folderUrl: 'Auth', apiUrl: 'refresh-token', axiosType: 'post' }),
  logout: noBodyEndpoint<void>({ folderUrl: 'Auth', apiUrl: 'logout', axiosType: 'post' }),
  forgotPin: endpoint<ForgotPinDto, ApiErrorDto>({ folderUrl: 'Auth', apiUrl: 'forgot-pin', axiosType: 'post' }),
};

export const articles = {
  list: (type?: string) =>
    endpoint<never, ArticleResponseDto[]>({ folderUrl: 'Articles', axiosType: 'get' })(undefined, { type }),
  create: endpoint<CreateArticleRequestDto, ArticleResponseDto>({ folderUrl: 'Articles', axiosType: 'post' }),
  getById: idEndpoint<ArticleResponseDto>({ folderUrl: 'Articles', axiosType: 'get' }),
  update: idBodyEndpoint<UpdateArticleRequestDto, ArticleResponseDto>({ folderUrl: 'Articles', axiosType: 'put' }),
  delete: idEndpoint<void>({ folderUrl: 'Articles', axiosType: 'delete' }),
  uploadImage: idBodyEndpoint<FormData, ArticleResponseDto>({
    folderUrl: 'Articles', apiUrl2: 'image', axiosType: 'post', isFormData: true,
  }),
  view: idEndpoint<void>({ folderUrl: 'Articles', apiUrl2: 'view', axiosType: 'post' }),
  like: idEndpoint<void>({ folderUrl: 'Articles', apiUrl2: 'like', axiosType: 'post' }),
  dislike: idEndpoint<void>({ folderUrl: 'Articles', apiUrl2: 'dislike', axiosType: 'post' }),
};

export const categoryArticles = {
  list: noBodyEndpoint<CategoryArticleResponseDto[]>({ folderUrl: 'CategoryArticles', axiosType: 'get' }),
  create: endpoint<CreateCategoryArticleRequestDto, CategoryArticleResponseDto>({ folderUrl: 'CategoryArticles', axiosType: 'post' }),
  getById: idEndpoint<CategoryArticleResponseDto>({ folderUrl: 'CategoryArticles', axiosType: 'get' }),
  update: idBodyEndpoint<UpdateCategoryArticleRequestDto, CategoryArticleResponseDto>({ folderUrl: 'CategoryArticles', axiosType: 'put' }),
  delete: idEndpoint<void>({ folderUrl: 'CategoryArticles', axiosType: 'delete' }),
};

export const comments = {
  listByArticle: (articleId: number) =>
    endpoint<never, CommentResponseDto[]>({ folderUrl: 'Comments', apiUrl: 'article', apiUrl2: articleId, axiosType: 'get' })(),
  create: endpoint<CreateCommentRequestDto, CommentResponseDto>({ folderUrl: 'Comments', axiosType: 'post' }),
  approve: idEndpoint<void>({ folderUrl: 'Comments', apiUrl2: 'approve', axiosType: 'put' }),
  reject: idEndpoint<void>({ folderUrl: 'Comments', apiUrl2: 'reject', axiosType: 'put' }),
  delete: idEndpoint<void>({ folderUrl: 'Comments', axiosType: 'delete' }),
};

export const cycles = {
  mine: noBodyEndpoint<CycleResponseDto[]>({ folderUrl: 'Cycles', apiUrl: 'mine', axiosType: 'get' }),
  create: endpoint<CreateCycleRequestDto, CycleResponseDto>({ folderUrl: 'Cycles', axiosType: 'post' }),
  predictNext: noBodyEndpoint<PredictNextCycleResponseDto>({ folderUrl: 'Cycles', apiUrl: 'predict-next', axiosType: 'get' }),
};

export const dailySymptoms = {
  mine: noBodyEndpoint<DailySymptomResponseDto[]>({ folderUrl: 'DailySymptoms', apiUrl: 'mine', axiosType: 'get' }),
  byCycle: (cycleId: number) =>
    endpoint<never, DailySymptomResponseDto[]>({ folderUrl: 'DailySymptoms', apiUrl: 'cycle', apiUrl2: cycleId, axiosType: 'get' })(),
  create: endpoint<CreateDailySymptomRequestDto, DailySymptomResponseDto>({ folderUrl: 'DailySymptoms', axiosType: 'post' }),
};

export const notes = {
  list: noBodyEndpoint<NoteResponseDto[]>({ folderUrl: 'Note', axiosType: 'get' }),
  create: endpoint<FormData, NoteResponseDto>({ folderUrl: 'Note', axiosType: 'post', isFormData: true }),
  getById: idEndpoint<NoteResponseDto>({ folderUrl: 'Note', axiosType: 'get' }),
  delete: idEndpoint<void>({ folderUrl: 'Note', axiosType: 'delete' }),
  addImage: idBodyEndpoint<FormData, NoteImageResponseDto>({ folderUrl: 'Note', apiUrl2: 'images', axiosType: 'post', isFormData: true }),
  deleteImage: (imageId: number) =>
    idEndpoint<void>({ folderUrl: 'Note', apiUrl: 'images', axiosType: 'delete' })(imageId),
};

export const pregnancies = {
  mine: noBodyEndpoint<PregnancyResponseDto[]>({ folderUrl: 'Pregnancies', apiUrl: 'mine', axiosType: 'get' }),
  create: endpoint<CreatePregnancyRequestDto, PregnancyResponseDto>({ folderUrl: 'Pregnancies', axiosType: 'post' }),
  updateStatus: idBodyEndpoint<UpdatePregnancyStatusRequestDto, PregnancyResponseDto>({ folderUrl: 'Pregnancies', axiosType: 'put' }),
};

export const questions = {
  list: noBodyEndpoint<QuestionResponseDto[]>({ folderUrl: 'Questions', axiosType: 'get' }),
  getById: idEndpoint<QuestionResponseDto>({ folderUrl: 'Questions', axiosType: 'get' }),
};

export const users = {
  list: noBodyEndpoint<UserProfileDto[]>({ folderUrl: 'Users', axiosType: 'get' }),
  me: noBodyEndpoint<UserProfileDto>({ folderUrl: 'Users', apiUrl: 'me', axiosType: 'get' }),
  updateMe: endpoint<UpdateProfileDto, void>({ folderUrl: 'Users', apiUrl: 'me', axiosType: 'put' }),
  getById: idEndpoint<UserProfileDto>({ folderUrl: 'Users', axiosType: 'get' }),
  delete: idEndpoint<void>({ folderUrl: 'Users', axiosType: 'delete' }),
};

export const apis = { auth, articles, categoryArticles, comments, cycles, dailySymptoms, notes, pregnancies, questions, users };

/* ============================================================ */
/*  useApi.ts — one hook, mirrors the webService rebuild          */
/* ============================================================ */

// import { useCallback, useState } from 'react';
//
// type ApiResult<TRes> = { success: true; data: TRes } | { success: false; error: string };
//
// export function useApi() {
//   const [inFlight, setInFlight] = useState(0);
//   const getToken = () => localStorage.getItem('accessToken') ?? undefined;
//
//   const callApi = useCallback(async <TReq, TRes>(model: ModelApi<TReq, TRes>): Promise<ApiResult<TRes>> => {
//     setInFlight((n) => n + 1);
//     try {
//       const token = getToken();
//       const headers: Record<string, string> = {};
//       if (token) headers.Authorization = `Bearer ${token}`;
//       if (model.body !== undefined && !model.isFormData) headers['Content-Type'] = 'application/json';
//
//       const res = await fetch(buildUrl(model), {
//         method: model.axiosType.toUpperCase(),
//         headers,
//         body: model.body === undefined ? undefined : model.isFormData ? (model.body as FormData) : JSON.stringify(model.body),
//       });
//
//       const text = await res.text();
//       const parsed = text ? JSON.parse(text) : undefined;
//
//       if (!res.ok) return { success: false, error: (parsed as ApiErrorDto)?.message ?? res.statusText };
//       return { success: true, data: parsed as TRes };
//     } catch (e: any) {
//       return { success: false, error: e?.message ?? 'network error' };
//     } finally {
//       setInFlight((n) => Math.max(0, n - 1));
//     }
//   }, []);
//
//   return { callApi, isLoading: inFlight > 0 };
// }

/* ============================================================ */
/*  Usage                                                         */
/* ============================================================ */
//
// const { callApi } = useApi();
//
// const login = await callApi(apis.auth.login({ mobile: '0912...', pin: '1234' }));
// // login.data: TokenResponseDto — inferred, no manual generic
//
// const list = await callApi(apis.articles.list('Public'));
// // list.data: ArticleResponseDto[]
//
// const one = await callApi(apis.articles.getById(5));
// // one.data: ArticleResponseDto
//
// const created = await callApi(apis.cycles.create({
//   startDate: '2026-09-01', lastDate: '2026-09-06', periodLengthDays: 5, cycleLengthDays: 28,
// }));
// // created.data: CycleResponseDto
//
// const predicted = await callApi(apis.cycles.predictNext);
// // predicted.data: PredictNextCycleResponseDto — no-body endpoints passed directly, not called

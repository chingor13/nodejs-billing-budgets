// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import * as path from 'path';

import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './budget_service_client_config.json';

const version = require('../../../package.json').version;

export interface ClientOptions
  extends gax.GrpcClientOptions,
    gax.GoogleAuthOptions,
    gax.ClientStubOptions {
  libName?: string;
  libVersion?: string;
  clientConfig?: gax.ClientConfig;
  fallback?: boolean;
  apiEndpoint?: string;
}

interface Descriptors {
  page: {[name: string]: gax.PageDescriptor};
  stream: {[name: string]: gax.StreamDescriptor};
  longrunning: {[name: string]: gax.LongrunningDescriptor};
}

export interface Callback<
  ResponseObject,
  NextRequestObject,
  RawResponseObject
> {
  (
    err: Error | null | undefined,
    value?: ResponseObject | null,
    nextRequest?: NextRequestObject,
    rawResponse?: RawResponseObject
  ): void;
}

export interface PaginationCallback<
  RequestObject,
  ResponseObject,
  ResponseType
> {
  (
    err: Error | null,
    values?: ResponseType[],
    nextPageRequest?: RequestObject,
    rawResponse?: ResponseObject
  ): void;
}

export interface PaginationResponse<
  RequestObject,
  ResponseObject,
  ResponseType
> {
  values?: ResponseType[];
  nextPageRequest?: RequestObject;
  rawResponse?: ResponseObject;
}

/**
 *  BudgetService stores Cloud Billing budgets, which define a
 *  budget plan and rules to execute as we track spend against that plan.
 */
export class BudgetServiceClient {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  auth: gax.GoogleAuth;

  /**
   * Construct an instance of BudgetServiceClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof BudgetServiceClient;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    const gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof BudgetServiceClient).scopes;
    const gaxGrpc = new gaxModule.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    const protos = gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      budgetPathTemplate: new gaxModule.PathTemplate(
        'billingAccounts/{billing_account}/budgets/{budget}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this._descriptors.page = {
      listBudgets: new gaxModule.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'budgets'
      ),
    };

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
      'google.cloud.billing.budgets.v1beta1.BudgetService',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.cloud.billing.budgets.v1beta1.BudgetService.
    const budgetServiceStub = gaxGrpc.createStub(
      opts.fallback
        ? (protos as protobuf.Root).lookupService(
            'google.cloud.billing.budgets.v1beta1.BudgetService'
          )
        : // tslint:disable-next-line no-any
          (protos as any).google.cloud.billing.budgets.v1beta1.BudgetService,
      opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const budgetServiceStubMethods = [
      'createBudget',
      'updateBudget',
      'getBudget',
      'listBudgets',
      'deleteBudget',
    ];

    for (const methodName of budgetServiceStubMethods) {
      const innerCallPromise = budgetServiceStub.then(
        (stub: {[method: string]: Function}) => (...args: Array<{}>) => {
          return stub[methodName].apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      this._innerApiCalls[methodName] = gaxModule.createApiCall(
        innerCallPromise,
        defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'billingbudgets.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'billingbudgets.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  createBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.ICreateBudgetRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,

        | protosTypes.google.cloud.billing.budgets.v1beta1.ICreateBudgetRequest
        | undefined,
      {} | undefined
    ]
  >;
  createBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.ICreateBudgetRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,
      | protosTypes.google.cloud.billing.budgets.v1beta1.ICreateBudgetRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Creates a new budget if none exists. There is a limit of 1,000 budgets
   * per billing account.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. the name of the billing account to create the budget in. Values
   *   are of the form `billingAccounts/{billingAccountId}`.
   * @param {google.cloud.billing.budgets.v1beta1.Budget} request.budget
   *   Required. Budget to create.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Budget]{@link google.cloud.billing.budgets.v1beta1.Budget}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  createBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.ICreateBudgetRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,
          | protosTypes.google.cloud.billing.budgets.v1beta1.ICreateBudgetRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,
      | protosTypes.google.cloud.billing.budgets.v1beta1.ICreateBudgetRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,

        | protosTypes.google.cloud.billing.budgets.v1beta1.ICreateBudgetRequest
        | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    return this._innerApiCalls.createBudget(request, options, callback);
  }
  updateBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IUpdateBudgetRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,

        | protosTypes.google.cloud.billing.budgets.v1beta1.IUpdateBudgetRequest
        | undefined,
      {} | undefined
    ]
  >;
  updateBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IUpdateBudgetRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,
      | protosTypes.google.cloud.billing.budgets.v1beta1.IUpdateBudgetRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Updates a budget and returns the updated budget.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.billing.budgets.v1beta1.Budget} request.budget
   *   Required. The updated budget object.
   *   The budget to update is specified by the budget name in the budget.
   * @param {google.protobuf.FieldMask} request.update_mask
   *   Optional. Indicates which fields in the provided budget to update.
   *   Read-only fields (such as `name`) cannot be changed. If this is not
   *   provided, then only fields with non-default values from the request are
   *   updated. See
   *   https://developers.google.com/protocol-buffers/docs/proto3#default for more
   *   details about default values.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Budget]{@link google.cloud.billing.budgets.v1beta1.Budget}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  updateBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IUpdateBudgetRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,
          | protosTypes.google.cloud.billing.budgets.v1beta1.IUpdateBudgetRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,
      | protosTypes.google.cloud.billing.budgets.v1beta1.IUpdateBudgetRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,

        | protosTypes.google.cloud.billing.budgets.v1beta1.IUpdateBudgetRequest
        | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      budget_name: request.budget!.name || '',
    });
    return this._innerApiCalls.updateBudget(request, options, callback);
  }
  getBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IGetBudgetRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,

        | protosTypes.google.cloud.billing.budgets.v1beta1.IGetBudgetRequest
        | undefined,
      {} | undefined
    ]
  >;
  getBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IGetBudgetRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,
      | protosTypes.google.cloud.billing.budgets.v1beta1.IGetBudgetRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Returns a budget.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. Name of budget to get. Values are of the form
   *   `billingAccounts/{billingAccountId}/budgets/{budgetId}`.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Budget]{@link google.cloud.billing.budgets.v1beta1.Budget}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  getBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IGetBudgetRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,
          | protosTypes.google.cloud.billing.budgets.v1beta1.IGetBudgetRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,
      | protosTypes.google.cloud.billing.budgets.v1beta1.IGetBudgetRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget,

        | protosTypes.google.cloud.billing.budgets.v1beta1.IGetBudgetRequest
        | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.getBudget(request, options, callback);
  }
  deleteBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IDeleteBudgetRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.protobuf.IEmpty,

        | protosTypes.google.cloud.billing.budgets.v1beta1.IDeleteBudgetRequest
        | undefined,
      {} | undefined
    ]
  >;
  deleteBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IDeleteBudgetRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.protobuf.IEmpty,
      | protosTypes.google.cloud.billing.budgets.v1beta1.IDeleteBudgetRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Deletes a budget. Returns successfully if already deleted.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. Name of the budget to delete. Values are of the form
   *   `billingAccounts/{billingAccountId}/budgets/{budgetId}`.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Empty]{@link google.protobuf.Empty}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  deleteBudget(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IDeleteBudgetRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.protobuf.IEmpty,
          | protosTypes.google.cloud.billing.budgets.v1beta1.IDeleteBudgetRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.protobuf.IEmpty,
      | protosTypes.google.cloud.billing.budgets.v1beta1.IDeleteBudgetRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.protobuf.IEmpty,

        | protosTypes.google.cloud.billing.budgets.v1beta1.IDeleteBudgetRequest
        | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.deleteBudget(request, options, callback);
  }

  listBudgets(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget[],
      protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsRequest | null,
      protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsResponse
    ]
  >;
  listBudgets(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget[],
      protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsRequest | null,
      protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsResponse
    >
  ): void;
  /**
   * Returns the budgets for a billing account.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. Name of billing account to list budgets under. Values
   *   are of the form `billingAccounts/{billingAccountId}`.
   * @param {number} request.page_size
   *   Optional. The maximum number of budgets to return per page.
   *   The default and maximum value are 100.
   * @param {string} request.page_token
   *   Optional. The value returned by the last `ListBudgetsResponse` which
   *   indicates that this is a continuation of a prior `ListBudgets` call,
   *   and that the system should return the next page of data.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [ListBudgetsResponse]{@link google.cloud.billing.budgets.v1beta1.ListBudgetsResponse}.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [ListBudgetsResponse]{@link google.cloud.billing.budgets.v1beta1.ListBudgetsResponse} in a single response.
   *   The second element is the next request object if the response
   *   indicates the next page exists, or null. The third element is
   *   an object representing [ListBudgetsResponse]{@link google.cloud.billing.budgets.v1beta1.ListBudgetsResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  listBudgets(
    request: protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.billing.budgets.v1beta1.IBudget[],
          protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsRequest | null,
          protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsResponse
        >,
    callback?: Callback<
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget[],
      protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsRequest | null,
      protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsResponse
    >
  ): Promise<
    [
      protosTypes.google.cloud.billing.budgets.v1beta1.IBudget[],
      protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsRequest | null,
      protosTypes.google.cloud.billing.budgets.v1beta1.IListBudgetsResponse
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    return this._innerApiCalls.listBudgets(request, options, callback);
  }
  // --------------------
  // -- Path templates --
  // --------------------
  budgetPath(budget: string) {
    return this._pathTemplates.budgetPathTemplate.render({
      budget,
    });
  }
  matchBudgetFromBudgetName(budgetName: string) {
    return this._pathTemplates.budgetPathTemplate.match(budgetName).budget;
  }
}
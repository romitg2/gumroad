import { Link } from "@inertiajs/react";
import React from "react";

import { Parameters } from "$app/components/Api/Parameters";
import { Layout } from "$app/components/Developer/Layout";
import CodeSnippet from "$app/components/ui/CodeSnippet";
import { Pill } from "$app/components/ui/Pill";
import { API_METHODS, ApiMethodData, ApiResourceData } from "$app/data/api_methods";

const ApiNavigation = ({ apiMethods }: { apiMethods: ApiResourceData[] }) => (
  <nav role="navigation" aria-label="API Reference">
    <menu>
      <li>
        <Link href={`${Routes.api_path()}#api-intro`}>Introduction</Link>
      </li>
      <li>
        <Link href={`${Routes.api_path()}#api-authentication`}>Authentication</Link>
      </li>
      <li>
        <Link href={`${Routes.api_path()}#api-scopes`}>Scopes</Link>
      </li>
      <li>
        <Link href={`${Routes.api_path()}#api-errors`}>Errors</Link>
      </li>
      <li>
        <Link href={`${Routes.api_path()}#api-methods`}>Methods</Link>
        <menu>
          {apiMethods.map((method) => (
            <li key={method.name}>
              <Link href={`${Routes.api_path()}#${method.name.toLowerCase().replace(/ /g, "-")}`}>
                {method.name}
              </Link>
            </li>
          ))}
        </menu>
      </li>
    </menu>
  </nav>
);

const ApiMethod = ({ method }: { method: ApiMethodData }) => (
  <div id={`${method.type}-${method.path}`}>
    <div className="flex flex-col gap-4">
      <div role="heading" aria-level={3} className="flex items-center gap-2">
        <Pill color="primary">{method.type.toUpperCase()}</Pill>
        <span>{method.path}</span>
      </div>
      <p dangerouslySetInnerHTML={{ __html: method.description }} />
      <CodeSnippet>
        {method.isOauth ? `https://gumroad.com${method.path}` : `https://api.gumroad.com/v2${method.path}`}
      </CodeSnippet>
      {method.parameters && method.parameters.length > 0 && <Parameters parameters={method.parameters} />}
      {method.curlExample && <CodeSnippet caption="cURL example">{method.curlExample}</CodeSnippet>}
      {method.responseExample && <CodeSnippet caption="Example response:">{method.responseExample}</CodeSnippet>}
    </div>
  </div>
);

const ApiResource = ({ resource }: { resource: ApiResourceData }) => (
  <div className="stack" id={resource.name.toLowerCase().replace(/ /g, "-")}>
    <div>
      <h2>{resource.name}</h2>
    </div>
    {resource.methods.map((method, index) => (
      <ApiMethod key={index} method={method} />
    ))}
  </div>
);

const PublicApi = () => {
  return (
    <Layout currentPage="api">
      <main className="p-4 md:p-8">
        <div>
          <div className="grid grid-cols-1 items-start gap-x-16 gap-y-8 lg:grid-cols-[var(--grid-cols-sidebar)]">
            <ApiNavigation apiMethods={API_METHODS} />
            <article style={{ display: "grid", gap: "var(--spacer-6)" }}>
              <div className="stack" id="api-intro">
                <div>
                  <p>
                    The Gumroad OAuth API is based around REST. We return JSON for every request, including{" "}
                    <Link href={`${Routes.api_path()}#api-errors`}>errors</Link>.
                  </p>
                </div>
                <div>
                  <div className="flex flex-col gap-4">
                    <p>
                      To start using the API, you'll need to{" "}
                      <Link href={`${Routes.settings_advanced_path()}#application-form`}>register your OAuth application</Link>. Note: The{" "}
                      <Link href={`${Routes.api_path()}#licenses`}>Verify License API endpoint</Link> does not require an OAuth application.
                    </p>
                    <p>After creating an application, you'll be given a unique application id and application secret.</p>
                  </div>
                </div>
              </div>

              <div className="stack" id="api-authentication">
                <div>
                  <h2>Authentication</h2>
                </div>
                <div>
                  <p>
                    On the application page, click{" "}
                    <a href="#" data-helper-prompt="How do I generate an access token?">
                      Generate access token
                    </a>{" "}
                    to get the token you will use with the API.
                  </p>
                </div>
              </div>

              <div className="stack" id="api-scopes">
                <div>
                  <h2>Scopes</h2>
                </div>
                <div>
                  <div className="flex flex-col gap-4">
                    <p>We've provided six scopes that you may request when the user authorizes your application.</p>
                    <div className="api-list">
                      <strong>view_profile:</strong> read-only access to the user's public information and products.
                      <br />
                      <strong>edit_products:</strong> read/write access to the user's products and their variants, offer codes, and custom fields.
                      <br />
                      <strong>view_sales:</strong> read access to the user's products' sales information, including sales counts. This scope is also
                      required in order to subscribe to the user's sales.
                      <br />
                      <strong>view_payouts:</strong> read access to the user's payouts information.
                      <br />
                      <strong>mark_sales_as_shipped:</strong> write access to mark the user's products' sales as shipped.
                      <br />
                      <strong>edit_sales:</strong> write access to refund the user's products' sales and resend purchase receipts to customers.
                    </div>
                  </div>
                </div>
              </div>

              <div className="stack" id="api-resources">
                <div>
                  <h2>Resources</h2>
                </div>
                <div>
                  <div className="flex flex-col gap-4">
                    <p>
                      <a href="#" data-helper-prompt="How do I create an OAuth application?">
                        Create an OAuth application
                      </a>{" "}
                      - A getting started guide for creating an application with our API.
                    </p>
                    <p>
                      <a href="http://rubygems.org/gems/omniauth-gumroad" target="_blank" rel="noreferrer">
                        omniauth-gumroad
                      </a>{" "}
                      - (Ruby) an OmniAuth strategy for Gumroad OAuth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="stack" id="api-more">
                <div>
                  <h2>More reading</h2>
                </div>
                <div>
                  <div className="flex flex-col gap-4">
                    <p>If you're interested in learning more about OAuth, here are some links that might be useful:</p>
                    <ul>
                      <li>
                        <a href="http://tools.ietf.org/html/draft-ietf-oauth-v2-07" target="_blank" rel="noreferrer">
                          OAuth 2 spec
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/intridea/oauth2" target="_blank" rel="noreferrer">
                          Ruby OAuth2 library
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/dgouldin/python-oauth2" target="_blank" rel="noreferrer">
                          Python OAuth2 library
                        </a>
                      </li>
                      <li>
                        <a href="https://github.com/adoy/PHP-OAuth2" target="_blank" rel="noreferrer">
                          PHP OAuth2 library
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="stack" id="api-errors">
                <div>
                  <h2>API Errors</h2>
                </div>
                <div>
                  <div className="flex flex-col gap-4">
                    <p>Gumroad uses HTTP status codes to indicate the status of a request. Here's a run down on likely response codes.</p>
                    <p>
                      <strong>200 OK</strong> everything worked as expected.
                      <br />
                      <strong>400 Bad Request</strong> you probably missed a required parameter.
                      <br />
                      <strong>401 Unauthorized</strong> you did not provide a valid access token.
                      <br />
                      <strong>402 Request Failed</strong> the parameters were valid but request failed.
                      <br />
                      <strong>404 Not Found</strong> the requested item doesn't exist.
                      <br />
                      <strong>500, 502, 503, 504 Server Error</strong> something else went wrong on our end.
                      <br />
                    </p>
                    <p>
                      To help you further, we provide a JSON object that goes more in-depth about the problem that led to the failed request.
                      Errors responses from the api will follow the following format.
                    </p>
                    <CodeSnippet>
                      {`{
  "success": false,
  "message": "The product could not be found."
}`}
                    </CodeSnippet>
                    <p></p>
                    <p>When present, the message will describe the particular problem and suggestions on what went wrong.</p>
                  </div>
                </div>
              </div>

              <div className="stack" id="api-methods">
                <div>
                  <h2>API Methods</h2>
                </div>
                <div>
                  <p>
                    Gumroad's OAuth 2.0 API lets you see information about your products, as well as you can add, edit, and delete offer codes,
                    variants, and custom fields. Finally, you can see a user's public information and subscribe to be notified of their sales.
                  </p>
                </div>
              </div>

              {API_METHODS.map((resource, index) => (
                <ApiResource key={index} resource={resource} />
              ))}
            </article>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default PublicApi;

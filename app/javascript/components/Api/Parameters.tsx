import React from "react";

import type { Parameter } from "$app/data/api_methods";

type ParametersProps = {
  parameters: Parameter[];
};

export const Parameters: React.FC<ParametersProps> = ({ parameters }) => (
  <div className="parameters">
    <h4>Parameters:</h4>
    <div className="flex flex-col gap-2">
      {parameters.map((param, index) => (
        <div key={index}>
          <strong>{param.name}</strong>
          {!param.required && <span className="text-muted"> (optional)</span>}
          {param.type ? <span className="text-muted"> ({param.type})</span> : null}
          {param.default ? <span className="text-muted"> - Default: "{param.default}"</span> : null}
          <br />
          <span dangerouslySetInnerHTML={{ __html: param.description }} />
        </div>
      ))}
    </div>
  </div>
);

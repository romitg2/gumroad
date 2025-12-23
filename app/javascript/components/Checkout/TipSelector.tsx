import cx from "classnames";
import * as React from "react";

import { Button } from "$app/components/Button";
import { Icon } from "$app/components/Icons";
import { PriceInput } from "$app/components/PriceInput";
import { useIsAboveBreakpoint } from "$app/components/useIsAboveBreakpoint";

import { getErrors, getTotalPriceFromProducts, isProcessing, useState } from "./payment";

const getTipLabel = (tip: number) => {
  if (tip === 0) return "No tip";
  return `${tip}%`;
};

export const TipSelector = () => {
  const [state, dispatch] = useState();
  const errors = getErrors(state);
  const showPercentageOptions = getTotalPriceFromProducts(state) > 0;
  const isDesktop = useIsAboveBreakpoint("sm");

  React.useEffect(() => {
    if (!showPercentageOptions && state.tip.type === "percentage")
      dispatch({ type: "set-value", tip: { type: "fixed", amount: null } });
  }, [showPercentageOptions]);

  const defaultOther = state.surcharges.type === "loaded" ? state.surcharges.result.subtotal * 0.3 : 5;

  // On mobile, always show the custom tip input
  const showCustomTipInput = !isDesktop || state.tip.type === "fixed";

  return (
    <div>
      <div className="flex flex-col gap-4">
        <h4>Add a tip?</h4>
        {showPercentageOptions ? (
          <div
            role="radiogroup"
            className="radio-buttons"
            style={{ gridTemplateColumns: `repeat(${state.tipOptions.length + (isDesktop ? 1 : 0)}, 1fr)` }}
          >
            {state.tipOptions.map((tip) => (
              <Button
                key={tip}
                role="radio"
                aria-checked={state.tip.type === "percentage" && tip === state.tip.percentage}
                onClick={() => {
                  dispatch({
                    type: "set-value",
                    tip: {
                      type: "percentage",
                      percentage: tip,
                    },
                  });
                }}
                disabled={isProcessing(state)}
                className="whitespace-nowrap"
                style={{ justifyContent: "center" }}
              >
                {getTipLabel(tip)}
              </Button>
            ))}
            {isDesktop ? (
              <Button
                role="radio"
                aria-checked={state.tip.type === "fixed"}
                onClick={() => {
                  dispatch({
                    type: "set-value",
                    tip: {
                      type: "fixed",
                      amount: state.tip.type === "fixed" ? state.tip.amount : defaultOther,
                    },
                  });
                }}
                disabled={isProcessing(state)}
                className="whitespace-nowrap"
                style={{ justifyContent: "center" }}
              >
                <Icon name="solid-currency-dollar" />
                Custom tip
              </Button>
            ) : null}
          </div>
        ) : null}
        {showCustomTipInput ? (
          <fieldset className={cx({ danger: errors.has("tip") })}>
            <PriceInput
              hasError={errors.has("tip")}
              ariaLabel="Custom tip"
              currencyCode="usd"
              cents={state.tip.type === "fixed" ? state.tip.amount : null}
              onChange={(newAmount) => {
                dispatch({ type: "set-value", tip: { type: "fixed", amount: newAmount } });
              }}
              placeholder="Custom tip"
              disabled={isProcessing(state)}
            />
          </fieldset>
        ) : null}
      </div>
    </div>
  );
};

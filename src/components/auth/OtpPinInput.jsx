import { forwardRef, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../../utilities/data';

const OtpPinInput = forwardRef(
  (
    { value = '', onChange, disabled, length = 6, native = false, error, ...props },
    ref
  ) => {
    const parent = useRef(null);

    const focusLast = () => {
      const el = [...parent.current.children].find((child) => !child.value);
      if (!el) return [...parent.current.children].at(-1).focus();
      el.focus();
    };

    const triggerChange = (v) => {
      if (v.length > length) return;
      onChange(native ? { target: { value: v } } : v);
      setTimeout(() => focusLast(), 10);
    };

    const handleInput = (e) => {
      const input = e.target;
      const inputValue = input.value;
      const index = parseInt(input.dataset.index, 10);

      if (inputValue.match(/^\d$/)) {
        const newValue = value.substring(0, index) + inputValue + value.substring(index + 1);
        triggerChange(newValue);
      } else if (inputValue === '') {
        const newValue = value.substring(0, index) + ' ' + value.substring(index + 1);
        triggerChange(newValue.trim());
      }
    };

    const handlePaste = (e) => {
      const paste = e.clipboardData.getData('text');
      const v = paste.slice(0, length);
      triggerChange(v);
    };

    const [isTyping, setTyping] = useState();

    return (
      <div>
        <p className="text-red-700">{isTyping}</p>
        <div
          ref={parent}
          className="grid w-full grid-cols-6 gap-2 md:gap-4"
          {...props}
        >
          {Array(length)
            .fill(null)
            .map((_, i) => (
              <input
                maxLength="1"
                disabled={disabled}
                key={i}
                data-index={i}
                value={value?.[i] || ''}
                onChange={handleInput}
                onTouchEnd={() => setTyping(true)}
                onPaste={handlePaste}
                ref={i === 0 ? ref : null}
                className={cn(
                  "grow shrink basis-0 text-center rounded-lg w-12 h-12 bg-[#B1B1B1] text-black text-opacity-50 text-[12.83px] font-normal font-['Manrope'] tracking-[10.39px]",
                  { 'pointer-events-none opacity-60': disabled }
                )}
              />
            ))}
        </div>
        {!!error && (
          <div className="mt-3 px-1 text-sm text-red-500">{error}</div>
        )}
      </div>
    );
  }
);

OtpPinInput.displayName = 'OtpPinInput';

OtpPinInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  length: PropTypes.number,
  onDone: PropTypes.func,
  native: PropTypes.bool,
  error: PropTypes.string,
};

export default OtpPinInput;

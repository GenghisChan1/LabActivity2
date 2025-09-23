// scripts.js
document.addEventListener("DOMContentLoaded", () => {
  // Helpers -----------------------------------------------------------------
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showErrorFor(targetElem, message) {
    // place an error message right after targetElem (works with inputs/selects and fieldsets)
    const id = targetElem.id || (targetElem.name || Math.random()).toString().replace(/\W/g, '');
    // remove previous error for same target
    clearErrorFor(targetElem);

    const err = document.createElement("div");
    err.className = "client-error";
    err.setAttribute("data-for", id);
    err.textContent = message;
    err.style.color = "#b00020";
    err.style.fontSize = "0.9rem";
    err.style.marginTop = "4px";

    // Insert after targetElem. If fieldset, insert after fieldset; if input/select, insert after it.
    targetElem.insertAdjacentElement("afterend", err);
  }

  function clearErrorFor(targetElem) {
    const parent = targetElem.parentNode;
    if (!parent) return;
    const id = targetElem.id || (targetElem.name || '').toString().replace(/\W/g, '');
    const existing = parent.querySelector(`.client-error[data-for="${id}"]`);
    if (existing) existing.remove();
  }

  function clearAllErrors(form) {
    if (!form) return;
    form.querySelectorAll(".client-error").forEach(e => e.remove());
  }

  // Registration form validation --------------------------------------------
  const regForm = document.getElementById("registerForm");
  if (regForm) {
    // scope selections inside the form to avoid id collisions with login page
    const fullnameEl = regForm.querySelector("#fullname");
    const emailEl = regForm.querySelector("#email");
    const usernameEl = regForm.querySelector("#username");
    const passwordEl = regForm.querySelector("#password");
    const confirmEl = regForm.querySelector("#confirm");
    const countryEl = regForm.querySelector("#country");
    const genderFieldset = (regForm.querySelector('input[name="gender"]') || {}).closest ? regForm.querySelector('input[name="gender"]').closest('fieldset') : null;
    const hobbiesFieldset = (regForm.querySelector('input[name="hobbies[]"]') || {}).closest ? regForm.querySelector('input[name="hobbies[]"]').closest('fieldset') : null;

    function validateRegisterForm() {
      let ok = true;
      clearAllErrors(regForm);

      // Full name
      if (!fullnameEl || !fullnameEl.value.trim()) {
        showErrorFor(fullnameEl || regForm, "Full name is required.");
        ok = false;
      }

      // Email
      if (!emailEl || !emailEl.value.trim()) {
        showErrorFor(emailEl || regForm, "Email is required.");
        ok = false;
      } else if (!emailRegex.test(emailEl.value.trim())) {
        showErrorFor(emailEl, "Enter a valid email address.");
        ok = false;
      }

      // Username
      if (!usernameEl || !usernameEl.value.trim()) {
        showErrorFor(usernameEl || regForm, "Username is required.");
        ok = false;
      }

      // Password
      if (!passwordEl || !passwordEl.value) {
        showErrorFor(passwordEl || regForm, "Password is required.");
        ok = false;
      } else if (passwordEl.value.length < 6) {
        showErrorFor(passwordEl, "Password should be at least 6 characters.");
        ok = false;
      }

      // Confirm
      if (!confirmEl || !confirmEl.value) {
        showErrorFor(confirmEl || regForm, "Please confirm your password.");
        ok = false;
      } else if (passwordEl && confirmEl && passwordEl.value !== confirmEl.value) {
        showErrorFor(confirmEl, "Passwords do not match.");
        ok = false;
      }

      // Gender (radio)
      if (genderFieldset) {
        const anyGender = regForm.querySelectorAll('input[name="gender"]:checked').length > 0;
        if (!anyGender) {
          showErrorFor(genderFieldset, "Please select your gender.");
          ok = false;
        }
      }

      // Hobbies (checkboxes) - require at least one
      if (hobbiesFieldset) {
        const anyHobby = regForm.querySelectorAll('input[name="hobbies[]"]:checked').length > 0;
        if (!anyHobby) {
          showErrorFor(hobbiesFieldset, "Please select at least one hobby.");
          ok = false;
        }
      }

      // Country
      if (!countryEl || !countryEl.value) {
        showErrorFor(countryEl || regForm, "Please select a country.");
        ok = false;
      }

      return ok;
    }

    // Real-time single-field validation
    function attachRealtimeValidation() {
      if (fullnameEl) fullnameEl.addEventListener("input", () => {
        if (fullnameEl.value.trim()) clearErrorFor(fullnameEl);
      });
      if (emailEl) emailEl.addEventListener("input", () => {
        if (emailRegex.test(emailEl.value.trim())) clearErrorFor(emailEl);
      });
      if (usernameEl) usernameEl.addEventListener("input", () => {
        if (usernameEl.value.trim()) clearErrorFor(usernameEl);
      });
      if (passwordEl) passwordEl.addEventListener("input", () => {
        clearErrorFor(passwordEl);
        if (confirmEl && confirmEl.value && passwordEl.value === confirmEl.value) clearErrorFor(confirmEl);
      });
      if (confirmEl) confirmEl.addEventListener("input", () => {
        if (passwordEl && confirmEl.value === passwordEl.value) {
          clearErrorFor(confirmEl);
        }
      });
      if (countryEl) countryEl.addEventListener("change", () => {
        if (countryEl.value) clearErrorFor(countryEl);
      });
      if (genderFieldset) {
        regForm.querySelectorAll('input[name="gender"]').forEach(r => r.addEventListener('change', () => clearErrorFor(genderFieldset)));
      }
      if (hobbiesFieldset) {
        regForm.querySelectorAll('input[name="hobbies[]"]').forEach(cb => cb.addEventListener('change', () => clearErrorFor(hobbiesFieldset)));
      }
    }

    attachRealtimeValidation();

    regForm.addEventListener("submit", (e) => {
      if (!validateRegisterForm()) {
        e.preventDefault();
        // focus first visible error
        const firstErr = regForm.querySelector(".client-error");
        if (firstErr) firstErr.previousElementSibling && firstErr.previousElementSibling.focus && firstErr.previousElementSibling.focus();
      }
    });
  }

  // Login form validation (simple) ------------------------------------------
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const loginUser = loginForm.querySelector("#username");
    const loginPass = loginForm.querySelector("#password");

    function validateLoginForm() {
      clearAllErrors(loginForm);
      let ok = true;
      if (!loginUser || !loginUser.value.trim()) {
        showErrorFor(loginUser || loginForm, "Username is required.");
        ok = false;
      }
      if (!loginPass || !loginPass.value) {
        showErrorFor(loginPass || loginForm, "Password is required.");
        ok = false;
      }
      return ok;
    }

    if (loginUser) loginUser.addEventListener("input", () => clearErrorFor(loginUser));
    if (loginPass) loginPass.addEventListener("input", () => clearErrorFor(loginPass));

    loginForm.addEventListener("submit", (e) => {
      if (!validateLoginForm()) {
        e.preventDefault();
      }
    });
  }
});

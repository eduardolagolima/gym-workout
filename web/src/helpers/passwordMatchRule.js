function passwordMatchRule(password, confirmPassword) {
  return () =>
    password === confirmPassword ||
    this.$t('generics.rules.password_must_match')
}

export default passwordMatchRule

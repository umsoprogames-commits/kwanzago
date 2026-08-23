// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'create_payment_intent.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$CreatePaymentIntent extends CreatePaymentIntent {
  @override
  final String paymentAlias;
  @override
  final int quantity;
  @override
  final String fareRuleId;

  factory _$CreatePaymentIntent(
          [void Function(CreatePaymentIntentBuilder)? updates]) =>
      (CreatePaymentIntentBuilder()..update(updates))._build();

  _$CreatePaymentIntent._(
      {required this.paymentAlias,
      required this.quantity,
      required this.fareRuleId})
      : super._();
  @override
  CreatePaymentIntent rebuild(
          void Function(CreatePaymentIntentBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  CreatePaymentIntentBuilder toBuilder() =>
      CreatePaymentIntentBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is CreatePaymentIntent &&
        paymentAlias == other.paymentAlias &&
        quantity == other.quantity &&
        fareRuleId == other.fareRuleId;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, paymentAlias.hashCode);
    _$hash = $jc(_$hash, quantity.hashCode);
    _$hash = $jc(_$hash, fareRuleId.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'CreatePaymentIntent')
          ..add('paymentAlias', paymentAlias)
          ..add('quantity', quantity)
          ..add('fareRuleId', fareRuleId))
        .toString();
  }
}

class CreatePaymentIntentBuilder
    implements Builder<CreatePaymentIntent, CreatePaymentIntentBuilder> {
  _$CreatePaymentIntent? _$v;

  String? _paymentAlias;
  String? get paymentAlias => _$this._paymentAlias;
  set paymentAlias(String? paymentAlias) => _$this._paymentAlias = paymentAlias;

  int? _quantity;
  int? get quantity => _$this._quantity;
  set quantity(int? quantity) => _$this._quantity = quantity;

  String? _fareRuleId;
  String? get fareRuleId => _$this._fareRuleId;
  set fareRuleId(String? fareRuleId) => _$this._fareRuleId = fareRuleId;

  CreatePaymentIntentBuilder() {
    CreatePaymentIntent._defaults(this);
  }

  CreatePaymentIntentBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _paymentAlias = $v.paymentAlias;
      _quantity = $v.quantity;
      _fareRuleId = $v.fareRuleId;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CreatePaymentIntent other) {
    _$v = other as _$CreatePaymentIntent;
  }

  @override
  void update(void Function(CreatePaymentIntentBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  CreatePaymentIntent build() => _build();

  _$CreatePaymentIntent _build() {
    final _$result = _$v ??
        _$CreatePaymentIntent._(
          paymentAlias: BuiltValueNullFieldError.checkNotNull(
              paymentAlias, r'CreatePaymentIntent', 'paymentAlias'),
          quantity: BuiltValueNullFieldError.checkNotNull(
              quantity, r'CreatePaymentIntent', 'quantity'),
          fareRuleId: BuiltValueNullFieldError.checkNotNull(
              fareRuleId, r'CreatePaymentIntent', 'fareRuleId'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint

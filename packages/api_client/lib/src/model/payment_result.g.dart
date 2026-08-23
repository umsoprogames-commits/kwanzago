// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payment_result.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const PaymentResultStateEnum _$paymentResultStateEnum_POSTED =
    const PaymentResultStateEnum._('POSTED');
const PaymentResultStateEnum _$paymentResultStateEnum_DECLINED =
    const PaymentResultStateEnum._('DECLINED');
const PaymentResultStateEnum _$paymentResultStateEnum_UNKNOWN =
    const PaymentResultStateEnum._('UNKNOWN');
const PaymentResultStateEnum _$paymentResultStateEnum_unknownDefaultOpenApi =
    const PaymentResultStateEnum._('unknownDefaultOpenApi');

PaymentResultStateEnum _$paymentResultStateEnumValueOf(String name) {
  switch (name) {
    case 'POSTED':
      return _$paymentResultStateEnum_POSTED;
    case 'DECLINED':
      return _$paymentResultStateEnum_DECLINED;
    case 'UNKNOWN':
      return _$paymentResultStateEnum_UNKNOWN;
    case 'unknownDefaultOpenApi':
      return _$paymentResultStateEnum_unknownDefaultOpenApi;
    default:
      return _$paymentResultStateEnum_unknownDefaultOpenApi;
  }
}

final BuiltSet<PaymentResultStateEnum> _$paymentResultStateEnumValues =
    BuiltSet<PaymentResultStateEnum>(const <PaymentResultStateEnum>[
  _$paymentResultStateEnum_POSTED,
  _$paymentResultStateEnum_DECLINED,
  _$paymentResultStateEnum_UNKNOWN,
  _$paymentResultStateEnum_unknownDefaultOpenApi,
]);

Serializer<PaymentResultStateEnum> _$paymentResultStateEnumSerializer =
    _$PaymentResultStateEnumSerializer();

class _$PaymentResultStateEnumSerializer
    implements PrimitiveSerializer<PaymentResultStateEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'POSTED': 'POSTED',
    'DECLINED': 'DECLINED',
    'UNKNOWN': 'UNKNOWN',
    'unknownDefaultOpenApi': 'unknown_default_open_api',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'POSTED': 'POSTED',
    'DECLINED': 'DECLINED',
    'UNKNOWN': 'UNKNOWN',
    'unknown_default_open_api': 'unknownDefaultOpenApi',
  };

  @override
  final Iterable<Type> types = const <Type>[PaymentResultStateEnum];
  @override
  final String wireName = 'PaymentResultStateEnum';

  @override
  Object serialize(Serializers serializers, PaymentResultStateEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  PaymentResultStateEnum deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      PaymentResultStateEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$PaymentResult extends PaymentResult {
  @override
  final String paymentId;
  @override
  final PaymentResultStateEnum state;
  @override
  final int totalAmountMinor;
  @override
  final String? receiptCode;

  factory _$PaymentResult([void Function(PaymentResultBuilder)? updates]) =>
      (PaymentResultBuilder()..update(updates))._build();

  _$PaymentResult._(
      {required this.paymentId,
      required this.state,
      required this.totalAmountMinor,
      this.receiptCode})
      : super._();
  @override
  PaymentResult rebuild(void Function(PaymentResultBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentResultBuilder toBuilder() => PaymentResultBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentResult &&
        paymentId == other.paymentId &&
        state == other.state &&
        totalAmountMinor == other.totalAmountMinor &&
        receiptCode == other.receiptCode;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, paymentId.hashCode);
    _$hash = $jc(_$hash, state.hashCode);
    _$hash = $jc(_$hash, totalAmountMinor.hashCode);
    _$hash = $jc(_$hash, receiptCode.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PaymentResult')
          ..add('paymentId', paymentId)
          ..add('state', state)
          ..add('totalAmountMinor', totalAmountMinor)
          ..add('receiptCode', receiptCode))
        .toString();
  }
}

class PaymentResultBuilder
    implements Builder<PaymentResult, PaymentResultBuilder> {
  _$PaymentResult? _$v;

  String? _paymentId;
  String? get paymentId => _$this._paymentId;
  set paymentId(String? paymentId) => _$this._paymentId = paymentId;

  PaymentResultStateEnum? _state;
  PaymentResultStateEnum? get state => _$this._state;
  set state(PaymentResultStateEnum? state) => _$this._state = state;

  int? _totalAmountMinor;
  int? get totalAmountMinor => _$this._totalAmountMinor;
  set totalAmountMinor(int? totalAmountMinor) =>
      _$this._totalAmountMinor = totalAmountMinor;

  String? _receiptCode;
  String? get receiptCode => _$this._receiptCode;
  set receiptCode(String? receiptCode) => _$this._receiptCode = receiptCode;

  PaymentResultBuilder() {
    PaymentResult._defaults(this);
  }

  PaymentResultBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _paymentId = $v.paymentId;
      _state = $v.state;
      _totalAmountMinor = $v.totalAmountMinor;
      _receiptCode = $v.receiptCode;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentResult other) {
    _$v = other as _$PaymentResult;
  }

  @override
  void update(void Function(PaymentResultBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentResult build() => _build();

  _$PaymentResult _build() {
    final _$result = _$v ??
        _$PaymentResult._(
          paymentId: BuiltValueNullFieldError.checkNotNull(
              paymentId, r'PaymentResult', 'paymentId'),
          state: BuiltValueNullFieldError.checkNotNull(
              state, r'PaymentResult', 'state'),
          totalAmountMinor: BuiltValueNullFieldError.checkNotNull(
              totalAmountMinor, r'PaymentResult', 'totalAmountMinor'),
          receiptCode: receiptCode,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint

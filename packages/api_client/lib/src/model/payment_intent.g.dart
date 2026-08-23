// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'payment_intent.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const PaymentIntentStateEnum _$paymentIntentStateEnum_PENDING_CONFIRMATION =
    const PaymentIntentStateEnum._('PENDING_CONFIRMATION');
const PaymentIntentStateEnum _$paymentIntentStateEnum_APPROVED =
    const PaymentIntentStateEnum._('APPROVED');
const PaymentIntentStateEnum _$paymentIntentStateEnum_DECLINED =
    const PaymentIntentStateEnum._('DECLINED');
const PaymentIntentStateEnum _$paymentIntentStateEnum_EXPIRED =
    const PaymentIntentStateEnum._('EXPIRED');
const PaymentIntentStateEnum _$paymentIntentStateEnum_CANCELLED =
    const PaymentIntentStateEnum._('CANCELLED');
const PaymentIntentStateEnum _$paymentIntentStateEnum_UNKNOWN =
    const PaymentIntentStateEnum._('UNKNOWN');
const PaymentIntentStateEnum _$paymentIntentStateEnum_unknownDefaultOpenApi =
    const PaymentIntentStateEnum._('unknownDefaultOpenApi');

PaymentIntentStateEnum _$paymentIntentStateEnumValueOf(String name) {
  switch (name) {
    case 'PENDING_CONFIRMATION':
      return _$paymentIntentStateEnum_PENDING_CONFIRMATION;
    case 'APPROVED':
      return _$paymentIntentStateEnum_APPROVED;
    case 'DECLINED':
      return _$paymentIntentStateEnum_DECLINED;
    case 'EXPIRED':
      return _$paymentIntentStateEnum_EXPIRED;
    case 'CANCELLED':
      return _$paymentIntentStateEnum_CANCELLED;
    case 'UNKNOWN':
      return _$paymentIntentStateEnum_UNKNOWN;
    case 'unknownDefaultOpenApi':
      return _$paymentIntentStateEnum_unknownDefaultOpenApi;
    default:
      return _$paymentIntentStateEnum_unknownDefaultOpenApi;
  }
}

final BuiltSet<PaymentIntentStateEnum> _$paymentIntentStateEnumValues =
    BuiltSet<PaymentIntentStateEnum>(const <PaymentIntentStateEnum>[
  _$paymentIntentStateEnum_PENDING_CONFIRMATION,
  _$paymentIntentStateEnum_APPROVED,
  _$paymentIntentStateEnum_DECLINED,
  _$paymentIntentStateEnum_EXPIRED,
  _$paymentIntentStateEnum_CANCELLED,
  _$paymentIntentStateEnum_UNKNOWN,
  _$paymentIntentStateEnum_unknownDefaultOpenApi,
]);

Serializer<PaymentIntentStateEnum> _$paymentIntentStateEnumSerializer =
    _$PaymentIntentStateEnumSerializer();

class _$PaymentIntentStateEnumSerializer
    implements PrimitiveSerializer<PaymentIntentStateEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'PENDING_CONFIRMATION': 'PENDING_CONFIRMATION',
    'APPROVED': 'APPROVED',
    'DECLINED': 'DECLINED',
    'EXPIRED': 'EXPIRED',
    'CANCELLED': 'CANCELLED',
    'UNKNOWN': 'UNKNOWN',
    'unknownDefaultOpenApi': 'unknown_default_open_api',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'PENDING_CONFIRMATION': 'PENDING_CONFIRMATION',
    'APPROVED': 'APPROVED',
    'DECLINED': 'DECLINED',
    'EXPIRED': 'EXPIRED',
    'CANCELLED': 'CANCELLED',
    'UNKNOWN': 'UNKNOWN',
    'unknown_default_open_api': 'unknownDefaultOpenApi',
  };

  @override
  final Iterable<Type> types = const <Type>[PaymentIntentStateEnum];
  @override
  final String wireName = 'PaymentIntentStateEnum';

  @override
  Object serialize(Serializers serializers, PaymentIntentStateEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  PaymentIntentStateEnum deserialize(Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      PaymentIntentStateEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$PaymentIntent extends PaymentIntent {
  @override
  final String id;
  @override
  final PaymentIntentStateEnum state;
  @override
  final int quantity;
  @override
  final int unitAmountMinor;
  @override
  final int totalAmountMinor;
  @override
  final DateTime expiresAt;
  @override
  final bool stepUpRequired;
  @override
  final BuiltMap<String, JsonObject?>? collector;

  factory _$PaymentIntent([void Function(PaymentIntentBuilder)? updates]) =>
      (PaymentIntentBuilder()..update(updates))._build();

  _$PaymentIntent._(
      {required this.id,
      required this.state,
      required this.quantity,
      required this.unitAmountMinor,
      required this.totalAmountMinor,
      required this.expiresAt,
      required this.stepUpRequired,
      this.collector})
      : super._();
  @override
  PaymentIntent rebuild(void Function(PaymentIntentBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PaymentIntentBuilder toBuilder() => PaymentIntentBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PaymentIntent &&
        id == other.id &&
        state == other.state &&
        quantity == other.quantity &&
        unitAmountMinor == other.unitAmountMinor &&
        totalAmountMinor == other.totalAmountMinor &&
        expiresAt == other.expiresAt &&
        stepUpRequired == other.stepUpRequired &&
        collector == other.collector;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, state.hashCode);
    _$hash = $jc(_$hash, quantity.hashCode);
    _$hash = $jc(_$hash, unitAmountMinor.hashCode);
    _$hash = $jc(_$hash, totalAmountMinor.hashCode);
    _$hash = $jc(_$hash, expiresAt.hashCode);
    _$hash = $jc(_$hash, stepUpRequired.hashCode);
    _$hash = $jc(_$hash, collector.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PaymentIntent')
          ..add('id', id)
          ..add('state', state)
          ..add('quantity', quantity)
          ..add('unitAmountMinor', unitAmountMinor)
          ..add('totalAmountMinor', totalAmountMinor)
          ..add('expiresAt', expiresAt)
          ..add('stepUpRequired', stepUpRequired)
          ..add('collector', collector))
        .toString();
  }
}

class PaymentIntentBuilder
    implements Builder<PaymentIntent, PaymentIntentBuilder> {
  _$PaymentIntent? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  PaymentIntentStateEnum? _state;
  PaymentIntentStateEnum? get state => _$this._state;
  set state(PaymentIntentStateEnum? state) => _$this._state = state;

  int? _quantity;
  int? get quantity => _$this._quantity;
  set quantity(int? quantity) => _$this._quantity = quantity;

  int? _unitAmountMinor;
  int? get unitAmountMinor => _$this._unitAmountMinor;
  set unitAmountMinor(int? unitAmountMinor) =>
      _$this._unitAmountMinor = unitAmountMinor;

  int? _totalAmountMinor;
  int? get totalAmountMinor => _$this._totalAmountMinor;
  set totalAmountMinor(int? totalAmountMinor) =>
      _$this._totalAmountMinor = totalAmountMinor;

  DateTime? _expiresAt;
  DateTime? get expiresAt => _$this._expiresAt;
  set expiresAt(DateTime? expiresAt) => _$this._expiresAt = expiresAt;

  bool? _stepUpRequired;
  bool? get stepUpRequired => _$this._stepUpRequired;
  set stepUpRequired(bool? stepUpRequired) =>
      _$this._stepUpRequired = stepUpRequired;

  MapBuilder<String, JsonObject?>? _collector;
  MapBuilder<String, JsonObject?> get collector =>
      _$this._collector ??= MapBuilder<String, JsonObject?>();
  set collector(MapBuilder<String, JsonObject?>? collector) =>
      _$this._collector = collector;

  PaymentIntentBuilder() {
    PaymentIntent._defaults(this);
  }

  PaymentIntentBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _state = $v.state;
      _quantity = $v.quantity;
      _unitAmountMinor = $v.unitAmountMinor;
      _totalAmountMinor = $v.totalAmountMinor;
      _expiresAt = $v.expiresAt;
      _stepUpRequired = $v.stepUpRequired;
      _collector = $v.collector?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PaymentIntent other) {
    _$v = other as _$PaymentIntent;
  }

  @override
  void update(void Function(PaymentIntentBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PaymentIntent build() => _build();

  _$PaymentIntent _build() {
    _$PaymentIntent _$result;
    try {
      _$result = _$v ??
          _$PaymentIntent._(
            id: BuiltValueNullFieldError.checkNotNull(
                id, r'PaymentIntent', 'id'),
            state: BuiltValueNullFieldError.checkNotNull(
                state, r'PaymentIntent', 'state'),
            quantity: BuiltValueNullFieldError.checkNotNull(
                quantity, r'PaymentIntent', 'quantity'),
            unitAmountMinor: BuiltValueNullFieldError.checkNotNull(
                unitAmountMinor, r'PaymentIntent', 'unitAmountMinor'),
            totalAmountMinor: BuiltValueNullFieldError.checkNotNull(
                totalAmountMinor, r'PaymentIntent', 'totalAmountMinor'),
            expiresAt: BuiltValueNullFieldError.checkNotNull(
                expiresAt, r'PaymentIntent', 'expiresAt'),
            stepUpRequired: BuiltValueNullFieldError.checkNotNull(
                stepUpRequired, r'PaymentIntent', 'stepUpRequired'),
            collector: _collector?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'collector';
        _collector?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'PaymentIntent', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint

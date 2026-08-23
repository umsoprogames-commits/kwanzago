// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'approve_payment_intent.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const ApprovePaymentIntentApprovalMethodEnum
    _$approvePaymentIntentApprovalMethodEnum_BIOMETRIC =
    const ApprovePaymentIntentApprovalMethodEnum._('BIOMETRIC');
const ApprovePaymentIntentApprovalMethodEnum
    _$approvePaymentIntentApprovalMethodEnum_PIN =
    const ApprovePaymentIntentApprovalMethodEnum._('PIN');
const ApprovePaymentIntentApprovalMethodEnum
    _$approvePaymentIntentApprovalMethodEnum_unknownDefaultOpenApi =
    const ApprovePaymentIntentApprovalMethodEnum._('unknownDefaultOpenApi');

ApprovePaymentIntentApprovalMethodEnum
    _$approvePaymentIntentApprovalMethodEnumValueOf(String name) {
  switch (name) {
    case 'BIOMETRIC':
      return _$approvePaymentIntentApprovalMethodEnum_BIOMETRIC;
    case 'PIN':
      return _$approvePaymentIntentApprovalMethodEnum_PIN;
    case 'unknownDefaultOpenApi':
      return _$approvePaymentIntentApprovalMethodEnum_unknownDefaultOpenApi;
    default:
      return _$approvePaymentIntentApprovalMethodEnum_unknownDefaultOpenApi;
  }
}

final BuiltSet<ApprovePaymentIntentApprovalMethodEnum>
    _$approvePaymentIntentApprovalMethodEnumValues = BuiltSet<
        ApprovePaymentIntentApprovalMethodEnum>(const <ApprovePaymentIntentApprovalMethodEnum>[
  _$approvePaymentIntentApprovalMethodEnum_BIOMETRIC,
  _$approvePaymentIntentApprovalMethodEnum_PIN,
  _$approvePaymentIntentApprovalMethodEnum_unknownDefaultOpenApi,
]);

Serializer<ApprovePaymentIntentApprovalMethodEnum>
    _$approvePaymentIntentApprovalMethodEnumSerializer =
    _$ApprovePaymentIntentApprovalMethodEnumSerializer();

class _$ApprovePaymentIntentApprovalMethodEnumSerializer
    implements PrimitiveSerializer<ApprovePaymentIntentApprovalMethodEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'BIOMETRIC': 'BIOMETRIC',
    'PIN': 'PIN',
    'unknownDefaultOpenApi': 'unknown_default_open_api',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'BIOMETRIC': 'BIOMETRIC',
    'PIN': 'PIN',
    'unknown_default_open_api': 'unknownDefaultOpenApi',
  };

  @override
  final Iterable<Type> types = const <Type>[
    ApprovePaymentIntentApprovalMethodEnum
  ];
  @override
  final String wireName = 'ApprovePaymentIntentApprovalMethodEnum';

  @override
  Object serialize(Serializers serializers,
          ApprovePaymentIntentApprovalMethodEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  ApprovePaymentIntentApprovalMethodEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      ApprovePaymentIntentApprovalMethodEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$ApprovePaymentIntent extends ApprovePaymentIntent {
  @override
  final ApprovePaymentIntentApprovalMethodEnum approvalMethod;
  @override
  final String? pin;
  @override
  final String deviceProof;

  factory _$ApprovePaymentIntent(
          [void Function(ApprovePaymentIntentBuilder)? updates]) =>
      (ApprovePaymentIntentBuilder()..update(updates))._build();

  _$ApprovePaymentIntent._(
      {required this.approvalMethod, this.pin, required this.deviceProof})
      : super._();
  @override
  ApprovePaymentIntent rebuild(
          void Function(ApprovePaymentIntentBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ApprovePaymentIntentBuilder toBuilder() =>
      ApprovePaymentIntentBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ApprovePaymentIntent &&
        approvalMethod == other.approvalMethod &&
        pin == other.pin &&
        deviceProof == other.deviceProof;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, approvalMethod.hashCode);
    _$hash = $jc(_$hash, pin.hashCode);
    _$hash = $jc(_$hash, deviceProof.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'ApprovePaymentIntent')
          ..add('approvalMethod', approvalMethod)
          ..add('pin', pin)
          ..add('deviceProof', deviceProof))
        .toString();
  }
}

class ApprovePaymentIntentBuilder
    implements Builder<ApprovePaymentIntent, ApprovePaymentIntentBuilder> {
  _$ApprovePaymentIntent? _$v;

  ApprovePaymentIntentApprovalMethodEnum? _approvalMethod;
  ApprovePaymentIntentApprovalMethodEnum? get approvalMethod =>
      _$this._approvalMethod;
  set approvalMethod(ApprovePaymentIntentApprovalMethodEnum? approvalMethod) =>
      _$this._approvalMethod = approvalMethod;

  String? _pin;
  String? get pin => _$this._pin;
  set pin(String? pin) => _$this._pin = pin;

  String? _deviceProof;
  String? get deviceProof => _$this._deviceProof;
  set deviceProof(String? deviceProof) => _$this._deviceProof = deviceProof;

  ApprovePaymentIntentBuilder() {
    ApprovePaymentIntent._defaults(this);
  }

  ApprovePaymentIntentBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _approvalMethod = $v.approvalMethod;
      _pin = $v.pin;
      _deviceProof = $v.deviceProof;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ApprovePaymentIntent other) {
    _$v = other as _$ApprovePaymentIntent;
  }

  @override
  void update(void Function(ApprovePaymentIntentBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  ApprovePaymentIntent build() => _build();

  _$ApprovePaymentIntent _build() {
    final _$result = _$v ??
        _$ApprovePaymentIntent._(
          approvalMethod: BuiltValueNullFieldError.checkNotNull(
              approvalMethod, r'ApprovePaymentIntent', 'approvalMethod'),
          pin: pin,
          deviceProof: BuiltValueNullFieldError.checkNotNull(
              deviceProof, r'ApprovePaymentIntent', 'deviceProof'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint

//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'approve_payment_intent.g.dart';

/// ApprovePaymentIntent
///
/// Properties:
/// * [approvalMethod]
/// * [pin]
/// * [deviceProof]
@BuiltValue()
abstract class ApprovePaymentIntent
    implements Built<ApprovePaymentIntent, ApprovePaymentIntentBuilder> {
  @BuiltValueField(wireName: r'approvalMethod')
  ApprovePaymentIntentApprovalMethodEnum get approvalMethod;
  // enum approvalMethodEnum {  BIOMETRIC,  PIN,  };

  @BuiltValueField(wireName: r'pin')
  String? get pin;

  @BuiltValueField(wireName: r'deviceProof')
  String get deviceProof;

  ApprovePaymentIntent._();

  factory ApprovePaymentIntent([void updates(ApprovePaymentIntentBuilder b)]) =
      _$ApprovePaymentIntent;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ApprovePaymentIntentBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ApprovePaymentIntent> get serializer =>
      _$ApprovePaymentIntentSerializer();
}

class _$ApprovePaymentIntentSerializer
    implements PrimitiveSerializer<ApprovePaymentIntent> {
  @override
  final Iterable<Type> types = const [
    ApprovePaymentIntent,
    _$ApprovePaymentIntent
  ];

  @override
  final String wireName = r'ApprovePaymentIntent';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ApprovePaymentIntent object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'approvalMethod';
    yield serializers.serialize(
      object.approvalMethod,
      specifiedType: const FullType(ApprovePaymentIntentApprovalMethodEnum),
    );
    if (object.pin != null) {
      yield r'pin';
      yield serializers.serialize(
        object.pin,
        specifiedType: const FullType(String),
      );
    }
    yield r'deviceProof';
    yield serializers.serialize(
      object.deviceProof,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    ApprovePaymentIntent object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object,
            specifiedType: specifiedType)
        .toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required ApprovePaymentIntentBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'approvalMethod':
          final valueDes = serializers.deserialize(
            value,
            specifiedType:
                const FullType(ApprovePaymentIntentApprovalMethodEnum),
          ) as ApprovePaymentIntentApprovalMethodEnum;
          result.approvalMethod = valueDes;
          break;
        case r'pin':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.pin = valueDes;
          break;
        case r'deviceProof':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.deviceProof = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  ApprovePaymentIntent deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ApprovePaymentIntentBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class ApprovePaymentIntentApprovalMethodEnum extends EnumClass {
  @BuiltValueEnumConst(wireName: r'BIOMETRIC')
  static const ApprovePaymentIntentApprovalMethodEnum BIOMETRIC =
      _$approvePaymentIntentApprovalMethodEnum_BIOMETRIC;
  @BuiltValueEnumConst(wireName: r'PIN')
  static const ApprovePaymentIntentApprovalMethodEnum PIN =
      _$approvePaymentIntentApprovalMethodEnum_PIN;
  @BuiltValueEnumConst(wireName: r'unknown_default_open_api', fallback: true)
  static const ApprovePaymentIntentApprovalMethodEnum unknownDefaultOpenApi =
      _$approvePaymentIntentApprovalMethodEnum_unknownDefaultOpenApi;

  static Serializer<ApprovePaymentIntentApprovalMethodEnum> get serializer =>
      _$approvePaymentIntentApprovalMethodEnumSerializer;

  const ApprovePaymentIntentApprovalMethodEnum._(String name) : super(name);

  static BuiltSet<ApprovePaymentIntentApprovalMethodEnum> get values =>
      _$approvePaymentIntentApprovalMethodEnumValues;
  static ApprovePaymentIntentApprovalMethodEnum valueOf(String name) =>
      _$approvePaymentIntentApprovalMethodEnumValueOf(name);
}

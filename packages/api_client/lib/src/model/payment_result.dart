//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'payment_result.g.dart';

/// PaymentResult
///
/// Properties:
/// * [paymentId]
/// * [state]
/// * [totalAmountMinor]
/// * [receiptCode]
@BuiltValue()
abstract class PaymentResult
    implements Built<PaymentResult, PaymentResultBuilder> {
  @BuiltValueField(wireName: r'paymentId')
  String get paymentId;

  @BuiltValueField(wireName: r'state')
  PaymentResultStateEnum get state;
  // enum stateEnum {  POSTED,  DECLINED,  UNKNOWN,  };

  @BuiltValueField(wireName: r'totalAmountMinor')
  int get totalAmountMinor;

  @BuiltValueField(wireName: r'receiptCode')
  String? get receiptCode;

  PaymentResult._();

  factory PaymentResult([void updates(PaymentResultBuilder b)]) =
      _$PaymentResult;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PaymentResultBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PaymentResult> get serializer =>
      _$PaymentResultSerializer();
}

class _$PaymentResultSerializer implements PrimitiveSerializer<PaymentResult> {
  @override
  final Iterable<Type> types = const [PaymentResult, _$PaymentResult];

  @override
  final String wireName = r'PaymentResult';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PaymentResult object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'paymentId';
    yield serializers.serialize(
      object.paymentId,
      specifiedType: const FullType(String),
    );
    yield r'state';
    yield serializers.serialize(
      object.state,
      specifiedType: const FullType(PaymentResultStateEnum),
    );
    yield r'totalAmountMinor';
    yield serializers.serialize(
      object.totalAmountMinor,
      specifiedType: const FullType(int),
    );
    if (object.receiptCode != null) {
      yield r'receiptCode';
      yield serializers.serialize(
        object.receiptCode,
        specifiedType: const FullType(String),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    PaymentResult object, {
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
    required PaymentResultBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'paymentId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.paymentId = valueDes;
          break;
        case r'state':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(PaymentResultStateEnum),
          ) as PaymentResultStateEnum;
          result.state = valueDes;
          break;
        case r'totalAmountMinor':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.totalAmountMinor = valueDes;
          break;
        case r'receiptCode':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.receiptCode = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PaymentResult deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PaymentResultBuilder();
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

class PaymentResultStateEnum extends EnumClass {
  @BuiltValueEnumConst(wireName: r'POSTED')
  static const PaymentResultStateEnum POSTED = _$paymentResultStateEnum_POSTED;
  @BuiltValueEnumConst(wireName: r'DECLINED')
  static const PaymentResultStateEnum DECLINED =
      _$paymentResultStateEnum_DECLINED;
  @BuiltValueEnumConst(wireName: r'UNKNOWN')
  static const PaymentResultStateEnum UNKNOWN =
      _$paymentResultStateEnum_UNKNOWN;
  @BuiltValueEnumConst(wireName: r'unknown_default_open_api', fallback: true)
  static const PaymentResultStateEnum unknownDefaultOpenApi =
      _$paymentResultStateEnum_unknownDefaultOpenApi;

  static Serializer<PaymentResultStateEnum> get serializer =>
      _$paymentResultStateEnumSerializer;

  const PaymentResultStateEnum._(String name) : super(name);

  static BuiltSet<PaymentResultStateEnum> get values =>
      _$paymentResultStateEnumValues;
  static PaymentResultStateEnum valueOf(String name) =>
      _$paymentResultStateEnumValueOf(name);
}

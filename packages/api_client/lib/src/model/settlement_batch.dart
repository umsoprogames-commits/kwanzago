//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'settlement_batch.g.dart';

/// SettlementBatch
///
/// Properties:
/// * [id]
/// * [state]
/// * [amountMinor]
/// * [availableAt]
@BuiltValue()
abstract class SettlementBatch
    implements Built<SettlementBatch, SettlementBatchBuilder> {
  @BuiltValueField(wireName: r'id')
  String get id;

  @BuiltValueField(wireName: r'state')
  SettlementBatchStateEnum get state;
  // enum stateEnum {  OPEN,  CLOSED,  AVAILABLE,  FAILED,  };

  @BuiltValueField(wireName: r'amountMinor')
  int get amountMinor;

  @BuiltValueField(wireName: r'availableAt')
  DateTime get availableAt;

  SettlementBatch._();

  factory SettlementBatch([void updates(SettlementBatchBuilder b)]) =
      _$SettlementBatch;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SettlementBatchBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SettlementBatch> get serializer =>
      _$SettlementBatchSerializer();
}

class _$SettlementBatchSerializer
    implements PrimitiveSerializer<SettlementBatch> {
  @override
  final Iterable<Type> types = const [SettlementBatch, _$SettlementBatch];

  @override
  final String wireName = r'SettlementBatch';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SettlementBatch object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
    yield r'state';
    yield serializers.serialize(
      object.state,
      specifiedType: const FullType(SettlementBatchStateEnum),
    );
    yield r'amountMinor';
    yield serializers.serialize(
      object.amountMinor,
      specifiedType: const FullType(int),
    );
    yield r'availableAt';
    yield serializers.serialize(
      object.availableAt,
      specifiedType: const FullType(DateTime),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    SettlementBatch object, {
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
    required SettlementBatchBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        case r'state':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(SettlementBatchStateEnum),
          ) as SettlementBatchStateEnum;
          result.state = valueDes;
          break;
        case r'amountMinor':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(int),
          ) as int;
          result.amountMinor = valueDes;
          break;
        case r'availableAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.availableAt = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  SettlementBatch deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SettlementBatchBuilder();
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

class SettlementBatchStateEnum extends EnumClass {
  @BuiltValueEnumConst(wireName: r'OPEN')
  static const SettlementBatchStateEnum OPEN = _$settlementBatchStateEnum_OPEN;
  @BuiltValueEnumConst(wireName: r'CLOSED')
  static const SettlementBatchStateEnum CLOSED =
      _$settlementBatchStateEnum_CLOSED;
  @BuiltValueEnumConst(wireName: r'AVAILABLE')
  static const SettlementBatchStateEnum AVAILABLE =
      _$settlementBatchStateEnum_AVAILABLE;
  @BuiltValueEnumConst(wireName: r'FAILED')
  static const SettlementBatchStateEnum FAILED =
      _$settlementBatchStateEnum_FAILED;
  @BuiltValueEnumConst(wireName: r'unknown_default_open_api', fallback: true)
  static const SettlementBatchStateEnum unknownDefaultOpenApi =
      _$settlementBatchStateEnum_unknownDefaultOpenApi;

  static Serializer<SettlementBatchStateEnum> get serializer =>
      _$settlementBatchStateEnumSerializer;

  const SettlementBatchStateEnum._(String name) : super(name);

  static BuiltSet<SettlementBatchStateEnum> get values =>
      _$settlementBatchStateEnumValues;
  static SettlementBatchStateEnum valueOf(String name) =>
      _$settlementBatchStateEnumValueOf(name);
}

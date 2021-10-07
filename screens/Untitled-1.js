<View>
<Menu>
    <MenuTrigger  >
        <Icon color="#f6f6f6" type='ionicon' name='ellipsis-vertical' size={32} />
    </MenuTrigger>
    <MenuOptions>
        <MenuOption onSelect={() => navigation.navigate('histo')} >
            <Text style={{ color: '#2f3037' }}>Historique</Text>
        </MenuOption>
        <MenuOption onSelect={() => navigation.navigate('params')} >
            <Text style={{ color: '#2f3037' }}>Parametres</Text>
        </MenuOption>
    </MenuOptions>
</Menu>
</View>